export default class DrawerAction {
    static ACTION_DRAWER = "ACTION_DRAWER";
    
    static showDrawer(){
        return {
            type:DrawerAction.ACTION_DRAWER,
        }
    };
}