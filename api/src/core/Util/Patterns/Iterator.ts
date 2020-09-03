import * as q from "q";

export default class Iterator{

    private data:(any[]|null)  =   null;
    private iterator_callback:(item:any,done:any|null)=>any   =   null;

    private counter:number         =   0;

    public constructor(data:(any[]|null),callback:(item:any,done:any|null)=>any){
        this.data    =  data;
        this.iterator_callback  = callback;
    }

    public getCounter():number{
        return this.counter;
    }

    public iterate():q.Promise<any>{
        var defer           =   q.defer();

        if(this.data == null || this.data.length ==0){
            defer.reject(new Error("No Data supplied for iterating."));
            return defer.promise;
        }

        if(this.iterator_callback == null){
            defer.reject(new Error("Iterator Not Defined."));
            return defer.promise;
        }

        this.counter    =   0;

        var me      =   this;
        var result  =   [];
        function checker(error,step_result){
            if(error != null){
                defer.reject(error);
            }

            if(error == null){
                result.push(step_result);
            }
            
            me.counter++;
            if(me.counter  >=  me.data.length){
                if(error == null){
                    defer.resolve(result);
                } else {
                    defer.reject(error);
                }
            } else {
                me.iterator_callback(me.data[me.counter],checker);
            }
        }
  
        this.iterator_callback(this.data[0], checker);
        return defer.promise;
    }
}