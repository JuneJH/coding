const myPromise = (function () {
    const PENDING = 'pending',                      //状态常量
        RESOLVED = 'resolved',
        REJECTED = 'rejected',
        promiseState = Symbol('promiseState'),      //promise状态
        promiseValue = Symbol('promiseValue'),      // promise值
        changeState = Symbol('changeState'),        // 改变promise状态得函数名，并改变后执行处理函数
        thenables = Symbol('thenables'),            // 存储成功处理函数得数组名
        catchables = Symbol('catchables'),          // 存储失败处理函数得数组名字
        settleHandle = Symbol('settleHandle'),      // 处理是否马上执行处理函数或者存储到处理函数数组中
        linkPromise = Symbol('linkPromise');        // 串联promise对象函数
    return class myPromise {
        /**
         * 改变promise状态，存储处理函数
         * @param {*} state 
         * @param {*} value 
         * @param {*} queue 
         */
        [changeState](state, value, queue) {
            // 如果状态时pending才能更改，否则不能在修改
            if (this[promiseState] != PENDING) {
                return;
            }
            this[promiseState] = state;
            this[promiseValue] = value;
            //执行处理函数
            queue.forEach(ele => {
                ele(value)
            })
        }
        constructor(executor) {
            this[promiseState] = PENDING;                     
            this[promiseValue] = 'undefined';                     
            this[thenables] = [];                     
            this[catchables] = [];                     

            const resolve = (data) => {
                this[changeState](RESOLVED, data, this[thenables])
            }
            const reject = (data) => {
                this[changeState](REJECTED, data, this[catchables])
            }
            try {
                executor(resolve, reject);
            } catch (error) {
                reject(error)
            }
        }
        /**
         * 处理函数是否当即执行还是等待，存储在数组中
         * @param {*} handle 
         * @param {*} state 
         * @param {*} queue 
         */
        [settleHandle](handle, state, queue) {
            if (typeof handle != 'function') return;
            if (this[promiseState] == state) {
                setTimeout(() => {
                    handle(this[promiseValue])
                }, 0);
            } else {
                queue.push(handle)
            }
        }
        /**
         * promise得串联，将上一个得处理函数代理一层，得到结果
         * @param {*} thenableHandel 
         * @param {*} catchableHandel 
         */
        [linkPromise](thenableHandel, catchableHandel) {
            function execu(handle, resolve, reject, data) {
                try {
                    const result = handle(data);
                    if (result instanceof myPromise) {
                        result.then(resp => {
                            resolve(resp)
                        }, err => {
                            reject(err)
                        })
                    } else {
                        resolve(result);
                    }
                } catch (err) {
                    reject(err)
                }
            }
            return new myPromise((resolve, reject) => {
                this[settleHandle](data => {
                    execu(thenableHandel, resolve, reject, data)
                }, RESOLVED, this[thenables])
                this[settleHandle](err => {
                    execu(catchableHandel, resolve, reject, err)
                }, REJECTED, this[catchables])
            })

        }
        then(thenableHande, catchHande) {
            return this[linkPromise](thenableHande, catchHande);
        };
        catch(catchHande) {
            return this[linkPromise](undefined,catchHande);
        }
        
        static all(iterable) {
            return new myPromise((resolve, reject) => {
                const result = iterable.map(p => {
                    const obj = {
                        data: null,
                        isResolve: false
                    }
                    p.then(res => {
                        obj.data = res;
                        obj.isResolve = true;
                        const nowResult = result.filter(ele => !ele.isResolve)
                        if (nowResult.length == 0) {
                            resolve(result.map(ele => ele.data))
                        }
                    }, err => {
                        reject(err)
                    })
                    return obj;
                })
            })
        }
        static race(proms) {
            return new myPromise((resolve, reject) => {
                proms.forEach(p => {
                    p.then(res => {
                        resolve(res)
                    }, err => {
                        reject(err)
                    })
                })
            })
        }
        static resolve(data) {
            if (data instanceof myPromise) {
                return data;
            } else {
                return new myPromise(resolve => {
                    resolve(data);
                })
            }
        }
        static reject(err) {
            return new myPromise((resolve, reject) => {
                reject(err)
            })
        }
    }
})()