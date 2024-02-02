// Regular Expressions for parsing tags and attributes
var startTag =
    /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
var attr =
    /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g; // Empty Elements - HTML 5

var empty: any = makeMap(
    'area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr'
); // Block Elements - HTML 5
// fixed by xxx 将 ins 标签从块级名单中移除

var block: any = makeMap(
    'a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video'
); // Inline Elements - HTML 5

var inline: any = makeMap(
    'abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var'
); // Elements that you can, intentionally, leave open
// (and which close themselves)

var closeSelf: any = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr'); // Attributes that have their values filled in disabled="disabled"

var fillAttrs: any = makeMap(
    'checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected'
); // Special Elements (can contain anything)

var special: any = makeMap('script,style');
function HTMLParser(html: any, handler: any) {
    var index;
    var chars;
    var match;
    var stack: any = [];
    var last = html;

    stack.last = function () {
        return this[this.length - 1];
    };

    while (html) {
        chars = true; // Make sure we're not in a script or style element

        if (!stack.last() || !special[stack.last()]) {
            // Comment
            if (html.indexOf('<!--') == 0) {
                index = html.indexOf('-->');

                if (index >= 0) {
                    if (handler.comment) {
                        handler.comment(html.substring(4, index));
                    }

                    html = html.substring(index + 3);
                    chars = false;
                } // end tag
            } else if (html.indexOf('</') == 0) {
                match = html.match(endTag);

                if (match) {
                    html = html.substring(match[0].length);
                    match[0].replace(endTag, parseEndTag);
                    chars = false;
                } // start tag
            } else if (html.indexOf('<') == 0) {
                match = html.match(startTag);

                if (match) {
                    html = html.substring(match[0].length);
                    match[0].replace(startTag, parseStartTag);
                    chars = false;
                }
            }

            if (chars) {
                index = html.indexOf('<');
                var text = index < 0 ? html : html.substring(0, index);
                html = index < 0 ? '' : html.substring(index);

                if (handler.chars) {
                    handler.chars(text);
                }
            }
        } else {
            html = html.replace(
                new RegExp('([\\s\\S]*?)</' + stack.last() + '[^>]*>'),
                function (all: any, text: string) {
                    text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, '$1$2');

                    if (handler.chars) {
                        handler.chars(text);
                    }

                    return '';
                }
            );
            parseEndTag('', stack.last());
        }

        if (html == last) {
            throw 'Parse Error: ' + html;
        }

        last = html;
    } // Clean up any remaining tags

    parseEndTag('', '');

    function parseStartTag(tag: any, tagName: string, rest: any, unary: any) {
        tagName = tagName.toLowerCase();

        if (block[tagName]) {
            while (stack.last() && inline[stack.last()]) {
                parseEndTag('', stack.last());
            }
        }

        if (closeSelf[tagName] && stack.last() == tagName) {
            parseEndTag('', tagName);
        }

        unary = empty[tagName] || !!unary;

        if (!unary) {
            stack.push(tagName);
        }

        if (handler.start) {
            var attrs: any = [];
            rest.replace(attr, function (match: any, name: string) {
                var value = arguments[2]
                    ? arguments[2]
                    : arguments[3]
                    ? arguments[3]
                    : arguments[4]
                    ? arguments[4]
                    : fillAttrs[name]
                    ? name
                    : '';
                attrs.push({
                    name: name,
                    value: value,
                    escaped: value.replace(/(^|[^\\])"/g, '$1\\"') // "
                });
            });

            if (handler.start) {
                handler.start(tagName, attrs, unary);
            }
        }
    }

    function parseEndTag(tag: any, tagName?: string) {
        // If no tag name is provided, clean shop
        if (!tagName) {
            var pos = 0;
        } // Find the closest opened tag of the same type
        else {
            for (var pos = stack.length - 1; pos >= 0; pos--) {
                if (stack[pos] == tagName) {
                    break;
                }
            }
        }

        if (pos >= 0) {
            // Close all the open elements, up the stack
            for (var i = stack.length - 1; i >= pos; i--) {
                if (handler.end) {
                    handler.end(stack[i]);
                }
            } // Remove the open elements from the stack

            stack.length = pos;
        }
    }
}

function makeMap(str: string) {
    var obj: any = {};
    var items = str.split(',');

    for (var i = 0; i < items.length; i++) {
        obj[items[i]] = true;
    }

    return obj;
}

function removeDOCTYPE(html: any) {
    return html
        .replace(/<\?xml.*\?>\n/, '')
        .replace(/<!doctype.*>\n/, '')
        .replace(/<!DOCTYPE.*>\n/, '');
}

function parseAttrs(attrs: any) {
    return attrs.reduce(function (pre: any, attr: any) {
        var value = attr.value;
        var name = attr.name;

        // by ice, 处理图片大小,链接地址 2019/8/17
        if (name == 'src') {
            if (value.indexOf('//') == 0) {
                pre[name] = 'https:' + value;
            } else {
                pre[name] = value;
            }
            return pre;
        }

        if (pre[name]) {
            pre[name] = pre[name] + ' ' + value;
        } else {
            pre[name] = value;
        }
        if (name == 'style' && value.indexOf('width') > -1) {
            pre[name] = value + 'max-width: 100% !important';
            return pre;
        }

        return pre;
    }, {});
}

function parseHtml(html: any) {
    // html = removeDOCTYPE(html);
    var stacks: any[] = [];
    var results: {
        node: any;
        children: any[];
    } = {
        node: 'root',
        children: []
    };
    HTMLParser(html, {
        start: function start(tag: any, attrs: any, unary: any) {
            // by ice 处理p标签中的图片出现间距
            if (tag == 'table') {
                let flag = false;
                for (var i in attrs) {
                    if (attrs[i].name == 'width') {
                        let unitWidth = uni.upx2px(750) + 'px';

                        if (attrs[i].value > unitWidth) {
                            attrs[i].value = unitWidth;
                        }
                    }
                    if (attrs[i].name == 'style') {
                        attrs[i].value += 'width: 100% !important;';
                    }
                }
            }
            if (tag == 'p') {
                let flag = false;
                for (var i in attrs) {
                    if (attrs[i].name == 'style') {
                        attrs[i].value = attrs[i].value + 'max-width: 100%;';
                        flag = true;
                    }
                }
                if (!flag) {
                    attrs.push({
                        name: 'style',
                        value: 'max-width: 100% !important;'
                    });
                }
            } else if (tag == 'img') {
                let unitWidth = uni.upx2px(750);
                let style = 'max-width: 100%;vertical-align: top;';
                let styleIndex = -1;
                for (var i in attrs) {
                    if (attrs[i].name == 'size') {
                        let size = attrs[i].value.split('x');

                        style +=
                            'width: ' +
                            unitWidth +
                            'px;height: ' +
                            (size[1] / size[0]) * unitWidth +
                            'px;';
                    } else if (attrs[i].name == 'style') {
                        styleIndex = +i;
                    }
                }
                if (styleIndex >= 0) {
                    attrs[styleIndex].value += style;
                } else {
                    attrs.push({
                        name: 'style',
                        value: style
                    });
                }
            }
            var node = {
                name: tag,
                attrs: undefined
            };

            if (attrs.length !== 0) {
                node.attrs = parseAttrs(attrs);
            }

            if (unary) {
                var parent = stacks[0] || results;

                if (!parent.children) {
                    parent.children = [];
                }

                parent.children.push(node);
            } else {
                stacks.unshift(node);
            }
        },
        end: function end(tag: any) {
            var node = stacks.shift();
            if (node.name !== tag) console.error('invalid state: mismatch end tag');

            if (stacks.length === 0) {
                results.children.push(node);
            } else {
                var parent = stacks[0];

                if (!parent.children) {
                    parent.children = [];
                }

                parent.children.push(node);
            }
        },
        chars: function chars(text: any) {
            var node = {
                type: 'text',
                text: text
            };

            if (stacks.length === 0) {
                results.children.push(node);
            } else {
                var parent = stacks[0];

                if (!parent.children) {
                    parent.children = [];
                }

                parent.children.push(node);
            }
        },
        comment: function comment(text: any) {
            var node = {
                node: 'comment',
                text: text
            };
            var parent = stacks[0];

            if (parent) {
                if (!parent.children) {
                    parent.children = [];
                }

                parent.children && parent.children.push(node);
            }
        }
    });
    return results.children;
}

export default parseHtml;
