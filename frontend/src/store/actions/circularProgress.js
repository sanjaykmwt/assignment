export default class CircularProgressAction {
    static ACTION_CIRCULAR_PROGRESS = "ACTION_CIRCULAR_PROGRESS";
    
    static progress(status){
        return {
            type:CircularProgressAction.ACTION_CIRCULAR_PROGRESS,
            payload:{
                progress:status
            }
        }
    };
}