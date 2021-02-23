window.addEventListener('load', function () {
    let that = this;   //申明一个全局变量用来接收指向实例对象的this
    class Tab {
        constructor(id) {
            that = this;  //把指向实例对象的this赋给that
            this.main = document.querySelector(id);
            this.ul = this.main.querySelector('ul');
            this.tabscon = this.main.querySelector('.tabscon');
            this.tabadd = this.main.querySelector('.fisrstnav .tabadd span');
            this.init();
        }

        init() {
            this.updateNode();
            this.tabadd.onclick = this.addTab;
            for (let i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;      //把i的值赋给每个对应的li的index
                this.lis[i].onclick = this.toggleTab;     //给每个li添加单击事件
                this.removed[i].onclick = this.clearTab;
                this.span[i].ondblclick = this.eritTab;
                this.sections[i].ondblclick = this.eritTab;
            }
        }

        //这个方法相当于跟新li和section的个数;
        updateNode() {
            this.lis = this.main.querySelectorAll('.fisrstnav ul li');
            this.sections = this.main.querySelectorAll('.tabscon section');
            this.removed = this.main.querySelectorAll('.icon-guanbi');
            this.span = this.main.querySelectorAll('.fisrstnav li span:first-child');

        }

        toggleTab() {
            let index = this.index;       //获取当前单击的li的index
            that.clearClass();             //调用clearclass()方法先清空li和section里的类名
            this.className = 'liactive';   //给当前点击的li添加类名
            that.sections[index].className = 'conactive';   //给当前点击的section添加类名
        }

        clearClass() {                    //排他思想
            for (let i = 0; i < this.lis.length; i++) {
                this.lis[i].className = "";
                this.sections[i].className = "";
            }
        }

        addTab() {
            that.clearClass();   //把所有的li 和 section 里的类都清空, 因为添加的元素里面有相应的类
            let random = Math.random();
            let li = '<li class="liactive"><span>新的测试</span><span class="iconfont icon-guanbi"></span></li>';
            that.ul.insertAdjacentHTML('beforeend', li);
            let section = '<section class="conactive">测试' + random + '</section>';
            that.tabscon.insertAdjacentHTML('beforeend', section);
            that.init();
        }

        clearTab(e) {
            e.stopPropagation();
            let index = this.parentNode.index;
            that.lis[index].remove();
            that.sections[index].remove();
            that.init();
            if (document.querySelector('.liactive')) return;    //如果删除的 不是 带有类的哪一个那就不用执行下面的语句
            index--;
            that.lis[index] && that.lis[index].click();

        }

        eritTab(e) {
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            let value = this.innerHTML;
            this.innerHTML = '<input type="text" value="' + value + '"/>';
            let input = this.children[0];
            input.select();
            input.onblur = function () {
                this.parentNode.innerHTML = this.value;
            };

            input.onkeyup = function (e) {
                if (e.keyCode === 13) {
                    this.blur();
                }
            };

        }
    }

    new Tab('main');

})