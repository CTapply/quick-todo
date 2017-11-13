function addCSSRule(sheet, selector, rules, index) {
  const currentRules = sheet.cssRules || sheet.rules;
  // console.log(selector)
  // console.log(rules)

  if ('insertRule' in sheet) {
    sheet.insertRule(selector + '{' + rules + '}', index);
  } else if ('addRule' in sheet) {
    sheet.addRule(selector, rules, index);
  }
}

export function createClass(name, rules) {
  let style;
  if (!document.getElementById('animation-style-id')) {
    style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'animation-style-id';
    document.getElementsByTagName('head')[0].appendChild(style);
    // console.log(style.sheet)
  } else {
    style = document.getElementById('animation-style-id');
    // console.log(style.sheet)
  }

  addCSSRule(style.sheet, name, rules);
  // if (!(style.sheet || {}).insertRule) {
  //   (style.styleSheet || style.sheet).addRule(name, rules);
  // } else {
  //   style.sheet.insertRule(name + '{' + rules + '}', 0);
  // }
}

export function deleteStyles() {
  if (document.getElementById('animation-style-id')) {
    const style = document.getElementById('animation-style-id');
    const sheet = style.sheet;
    while (sheet.cssRules.length > 0) {
      console.log('size of the sheet', sheet.cssRules.length)
      sheet.deleteRule(0);
    }
    console.log('Deleted the style sheet');
  }
}
