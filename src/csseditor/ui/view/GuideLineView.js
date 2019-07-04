import UIElement, { EVENT } from "../../../util/UIElement";
import { combineKeyArray, isNotUndefined, keyEach, CSS_TO_STRING } from "../../../util/functions/func";
import { Length } from "../../../editor/unit/Length";
import { Layer } from "../../../editor/items/Layer";

/**
 * 객체와의 거리의 가이드 라인을 그려주는 컴포넌트
 */
export default class GuideLineView extends UIElement {

    template() {
        return `<div class='guide-line-view' ></div>`
    }

    createBackgroundImage (color, x, y, width, height) {
        return {
            'background-image': `linear-gradient(to right, ${color}, ${color})`,
            'background-size' : `${width} ${height}`,
            'background-position' : `${x} ${y}`,
            'background-repeat': 'no-repeat'
        }
    }
    
    createGuideLine (list) {
    
        const lineWidth = Length.px(1); 
        const baseLineColor = 'rgb(180, 199, 254)'
        const baseRectColor = 'rgb(244, 140, 255)'
    
        var images = []
    
        list.forEach(it => {
    
            var target = it.B; 
    
            if (isNotUndefined(it.ax)) {
    
                images.push(this.createBackgroundImage(baseRectColor, Length.px(it.bx), it.A.screenY, lineWidth, it.A.height))
    
                
                if (target instanceof Layer) {
                    images.push(this.createBackgroundImage(baseRectColor, Length.px(it.bx), target.screenY, lineWidth, target.height))
                }
    
                var minY = Length.min(target.screenY, it.A.screenY);
                var maxY = Length.max(target.screenY2, it.A.screenY2);
    
                images.push(this.createBackgroundImage(baseLineColor, Length.px(it.bx), minY, lineWidth, Length.px(maxY.value - minY.value)))            
    
            } else {
                images.push(this.createBackgroundImage(baseRectColor, it.A.screenX, Length.px(it.by), it.A.width, lineWidth))            
    
                var minX = Length.min(target.screenX, it.A.screenX);
                var maxX = Length.max(target.screenX2, it.A.screenX2);
    
                images.push(this.createBackgroundImage(baseLineColor, minX, Length.px(it.by), Length.px(maxX.value - minX.value), lineWidth))            
            }
    
        })
    
        var results = {}
        images.forEach(item => {
            keyEach(item, (key, value) => {
                if (!results[key]) results[key] = []
                results[key].push(value);
            })
        })
    
        return combineKeyArray(results);
    }

    removeGuideLine() {
        this.$el.cssText('');
    }

    setGuideLine (list) {
        this.$el.cssText(CSS_TO_STRING(this.createGuideLine(list)));
    }

    [EVENT('removeGuideLine')] () {
        this.removeGuideLine()
    }

    [EVENT('refreshGuideLine')] (list) {
        this.setGuideLine(list);
    }
} 