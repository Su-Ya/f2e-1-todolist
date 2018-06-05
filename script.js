(function () {
    var I = {
        $: function (x) {
            if (document.getElementById(x)) return document.getElementById(x);
            return false;
        },
        CX: function (t, a, y, x) {
            var e = document.createElement(t);
            if (a) {
                for (var k in a) {
                    if (k == 'class') e.className = a[k];
                    else if (k == 'id') e.id = a[k];
                    else e.setAttribute(k, a[k]);
                };
            };
            if (y) {
                for (var k in y) e.style[k] = y[k];
            };
            if (x) {
                e.appendChild(document.createTextNode(x));
            };
            return e;
        },
        init: function () {
            I.$('fake-input').addEventListener('click', I.openDialog);
        },
        openDialog: function () {
            var close = I.CX('div', {
                class: 'close-layer',
                id: 'closelayer'
            });

            I.$('add-task').style.display = 'block';
            I.$('fake-input').style.display = 'none';
            I.$('detail-container').style.display = 'block';
            console.log('here');

        }
    }
    window.onload = function () {
        I.init();
    }
})();