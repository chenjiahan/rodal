/**
 * Detect animation events
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 * Github: https://github.com/facebook/react/blob/master/src/addons/transitions/ReactTransitionEvents.js
 */

const EVENT_MAP = {
          'animation' :       'animationend',
         'OAnimation' :      'oAnimationEnd',
        'msAnimation' :     'MSAnimationEnd',
       'MozAnimation' :    'mozAnimationEnd',
    'WebkitAnimation' : 'webkitAnimationEnd'
};

const endEvents = [];

function detectEvents() {
    const testStyle = document.createElement('div').style;
    if (!('AnimationEvent' in window)) {
        delete EVENT_MAP.animation;
    }
    for (let styleName in EVENT_MAP) {
        if (styleName in testStyle) {
            endEvents.push(EVENT_MAP[styleName]);
            break;
        }
    }
}

const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

if (canUseDOM) {
    detectEvents();
}

export default function addEndEventListener(node, eventListener) {
    // If CSS transitions are not supported, trigger an "end animation"
    // event immediately.
    if (endEvents.length === 0) {
        if (typeof window !== 'undefined' && 'setTimeout' in window) {
            window.setTimeout(eventListener, 0);
        }
        return;
    }

    endEvents.forEach(event => {
        node.addEventListener(event, eventListener, false);
    });

    return {
        remove() {
            endEvents.forEach(event => {
                node.removeEventListener(event, eventListener, false);
            });
        }
    }
};
