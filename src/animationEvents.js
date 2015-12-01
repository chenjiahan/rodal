/**
 * detect animation events
 */

let EVENT_NAME_MAP = {
          'animation' :       'animationend',
         'OAnimation' :      'oAnimationEnd',
        'msAnimation' :     'MSAnimationEnd',
       'MozAnimation' :    'mozAnimationEnd',
    'WebkitAnimation' : 'webkitAnimationEnd'
};

let endEvents = [];
let testStyle = document.createElement('div').style;

if (!('AnimationEvent' in window)) {
    delete EVENT_NAME_MAP.animation;
}

for (let styleName in EVENT_NAME_MAP) {
    if (styleName in testStyle) {
        endEvents.push(EVENT_NAME_MAP[styleName]);
        break;
    }
}

let animationEvents = {
    addEndEventListener: (node, eventListener) => {
        if (endEvents.length === 0) {
            window.setTimeout(eventListener, 0);
            return;
        }
        endEvents.forEach(endEvent => {
            node.addEventListener(endEvent, eventListener, false);
        });
    },
    removeEndEventListener: (node, eventListener) => {
        if (endEvents.length === 0) {
            return;
        }
        endEvents.forEach(endEvent => {
            node.removeEventListener(endEvent, eventListener, false);
        });
    }
};

export default animationEvents;
