(function () {
    var A = {
        base: 'https://hex-timechamber.herokuapp.com/v1/todos',
        ajax: function (method, params, input) {
            var base = A.base,
                data;
            if (params) base = A.base + params;
            x = new XMLHttpRequest();
            // x.withCredentials = true;
            x.open(method, base, true);
            if (method === 'GET' || method === 'get') {
                x.onreadystatechange = function () {
                    if (x.readyState == 4 && x.status == 200) {
                        var response = JSON.parse(x.responseText);
                        if (method === 'POST') {
                            A.response.post(response);
                        } else {
                            A.response.get(response);
                        }
                    }
                };
            };
            if (method === 'POST' || method === 'post') {
                x.setRequestHeader('Content-type', 'application/json');
                data = JSON.parse(x.responseText);

            }
            x.send(data);

            x.onload = function () {
                var callbacks = JSON.parse(x.responseText);
            };
        },
        response: {
            get: function (data) {
                //count
                var left = 0,
                    accomplished = 0,
                    total = data.length;

                //template
                var container = document.querySelector('.task-container');

                var t = '';
                var dataArray = [];

                for (k in data) {
                    if (data[k].isDone === true) accomplished++;

                    t = (data[k].isStared === true) ? '<div class="task task--bookmark">' : '<div class="task">';
                    t += '<i class="fas fa-ellipsis-v task-sort"></i>';
                    t += '<label class="task-checkbox inline-block grid-xs">';
                    t += (data[k].isDone === true) ? '<input type="checkbox" checked>' : '<input type="checkbox">';
                    t += '<span class="checkmark"></span>';
                    t += '</label>';
                    t += '<div class="inline-block grid-large">';
                    //title
                    if (data[k].isDone === true && data[k].title) t += '<h2 class="done">' + data[k].title + '</h2>';
                    if (data[k].isDone === false && data[k].title) t += '<h2>' + data[k].title + '</h2>';
                    if (data[k].title === undefined) t += '<h2>尚未填寫</h2>';
                    t += '</div>';
                    t += '<div class="inline-block grid-sm">';
                    //star
                    t += '<i class="far fa-star"></i>';
                    t += '<i class="fas fa-pencil-alt"></i>';
                    t += '</div>';
                    t += '<div class="status-bar">';
                    //deadline
                    var deadline = moment(data[k].deadline).format("YYYY/MM/DD");
                    t += '<i class="far fa-calendar-alt">' + deadline + '</i>';
                    //t += '<i class="far fa-file"></i>'; //no file func
                    //comments
                    if (data[k].comments) t += '<i class="far fa-comment-dots" title="' + data[k].comments + '"></i>';
                    t += '</div>';
                    t += '</div>';
                    dataArray.push(t);

                };

                //count
                left = total - accomplished;
                I.$('total').innerHTML = left + '/' + total;
                //template
                container.innerHTML = dataArray.join('');
            },
            post: function (data) {
                var title = data.title,
                    comments = data.comments,
                    deadline = data.deadline,
                    isStared = data.isStared,
                    isDone = data.isDone,
                    createdAt = data.createdAt,
                    updatedAt = data.updatedAt;
            }
        },
        data: JSON.stringify({
            "title": "測試代辦2",
            "comments": "內容11",
            "deadline": "2018-06-05T13:25:31.526Z",
            "isStared": false,
            "isDone": false
        })
    }

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
            I.$('fake-input').addEventListener('click', I.toggleAddDialog);
            I.$('add-reset').addEventListener('click', I.toggleAddDialog);
            A.ajax('GET');
        },
        addDialogStatus: false,
        toggleAddDialog: function () {
            var close = I.CX('div', {
                class: 'close-layer',
                id: 'closelayer'
            }, {
                display: 'block'
            });
            var addForm = document.querySelector('.form-style');
            if (!I.$('closelayer')) document.getElementsByTagName('body')[0].appendChild(close);
            //status
            I.addDialogStatus = (I.addDialogStatus === true) ? 'false' : true;
            //template
            I.$('add-task').style.display = (I.addDialogStatus === true) ? 'block' : 'none';
            I.$('fake-input').style.display = (I.addDialogStatus === true) ? 'none' : 'block';
            I.$('detail-container').style.display = (I.addDialogStatus === true) ? 'block' : 'none';
            if (I.$('add-input')) I.$('add-input').focus();
            if (I.$('closelayer')) I.$('closelayer').addEventListener('click', I.toggleAddDialog);
            if (I.$('closelayer')) I.$('closelayer').style.display = (I.addDialogStatus === true) ? 'block' : 'none';
            addForm.classList.toggle('focus-style');
        }
    }
    window.onload = function () {
        I.init();
    }
})();