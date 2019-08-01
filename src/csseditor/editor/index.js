
import CanvasView from "../ui/view/CanvasView";
import ToolMenu from "../ui/view/ToolMenu";

import UIElement, { EVENT } from "../../util/UIElement";
import { CLICK } from "../../util/Event";
import Inspector from "../ui/control/Inspector";

import popup from "../ui/popup";  
import StyleView from "../ui/view/StyleView";
import ObjectList from "../ui/control/ObjectList";
import LogoView from "../ui/view/LogoView";
import ExternalToolMenu from "../ui/view/ExternalToolMenu";
import icon from "../ui/icon/icon";
import CommandView from "../ui/view/CommandView";
import { editor } from "../../editor/editor";
import Dom from "../../util/Dom";

// var JSZip = require('jszip')

export default class CSSEditor extends UIElement {
  
  initialize () {
    super.initialize()
    Dom.create(document.body).attr('data-theme', editor.theme);
  }

  template() {
    return this.templateForEditor();
  }

  templateForEditor() {
    return `
      <div class="layout-main" ref="$layoutMain">
        <div class="layout-header">
            <LogoView />
            <ToolMenu />
            <ExternalToolMenu />
        </div>
        <div class="layout-middle" ref='$middle'>
          <div class='layout-left'>
            <ObjectList />
          </div>
          <div class="layout-right">
            <Inspector />
          </div>
          <div class="layout-body">
            <CanvasView />
            <DrawingView />            
          </div>                   
          <div class='layout-tools'>
            <button ref='$toggleRight'>${icon.dahaze}</button>
          </div>
        </div>
        <FillPopup />
        <ColorPickerPopup  />
        <BoxShadowPropertyPopup />
        <TextShadowPropertyPopup />
        <AnimationPropertyPopup />
        <TransitionPropertyPopup />
        <KeyframePopup />
        <ClipPathPopup />
        <SVGPropertyPopup />
        <SelectorPopup />
        <ImageSelectPopup />
        <GradientPickerPopup />
        <SVGFilterPopup />
        <StyleView />    
        <CommandView />    
      </div>
    `;
  }

  components() {
    return {
      ...popup,
      ObjectList,
      CommandView,
      Inspector,
      ToolMenu,
      CanvasView,
      StyleView,
      LogoView,
      ExternalToolMenu
    };
  }

  [EVENT('changeTheme')] () {
    Dom.create(document.body).attr('data-theme', editor.theme);
  }

  [CLICK('$toggleRight')] () {
    this.trigger('toggleRightPanel');
  }

  [EVENT('toggleRightPanel')] () {
    // editor.openRightPanel = !editor.openRightPanel
    // this.refs.$middle.toggleClass('open-right', editor.openRightPanel);
  }

  [EVENT('refreshAll')] () {
    // this.refs.$middle.toggleClass('open-right', editor.openRightPanel);

    this.emit('refreshProjectList');
    this.trigger('refreshAllSelectProject');
  }

  [EVENT('refreshAllSelectProject')] () {      
    this.emit('refreshArtBoardList')    
    this.trigger('refreshAllSelectArtBoard')
  }

  [EVENT('refreshAllSelectArtBoard')] () {      
    this.emit('refreshLayerTreeView')    
    this.trigger('refreshElement')
  }  

  [EVENT('refreshElement')] (current) {
    this.emit('refreshCanvas', current)
    this.emit('refreshStyleView', current)
  }

  // [DRAGOVER() + PREVENT] (e) {}

  // [DROP() + PREVENT] (e) {
  //   const files = [...e.dataTransfer.files]

  //   if (files.length) {
  //     JSZip.loadAsync(files[0]).then(zip => {
  //       console.log(zip);
  //       var len = Object.keys(zip.files).length
  //       var sketchData = {}

  //       const loadSketch = () => {
  //         if (Object.keys(sketchData).length === len) {
  //           this.emit('loadSketchData', sketchData);
  //         }
  //       }


  //       Object.keys(zip.files).forEach(relativePath => {
  //         var zipEntry = zip.files[relativePath]

  //         if (relativePath.includes('.json')) {
  //             zipEntry.async('string').then((content) => {
  //               var page = JSON.parse(content)
  //               sketchData[relativePath] = page; 

  //               loadSketch()
  //             },
  //             function error (e) {
  //               console.log(e)
  //             })
  //         } else if (relativePath.includes('.png')) {
  //           zipEntry.async('base64').then((content) => {
  //             var image = 'data:image/png;base64,' + content; 
  //             relativePath = relativePath.replace('.png', '')
  //             sketchData[relativePath] = image; 

  //             loadSketch()              
  //           },
  //           function error (e) {
  //             console.log(e)
  //           })
  //         }
  //       })

        
  //     })
  //   }


  // }
}
