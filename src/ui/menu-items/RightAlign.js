import MenuItem from "./MenuItem";
import icon from "@icon/icon";
   
export default class RightAlign extends MenuItem {
  getIconString() {
    return icon.right;
  }
  getTitle() {
    return "Right";
  }

  isHideTitle () {
    return true; 
  }  

  clickButton(e) {
    this.emit('sort.right');
  }
}
