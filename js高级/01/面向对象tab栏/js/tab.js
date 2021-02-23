window.addEventListener('load', function () {
    let that;
    class Tab {
        constructor(id) {
            that = this;
            this.main = document.querySelector(id);
            this.ul = this.main.querySelector(".fisrstnav ul");
            this.tabscon = this.main.querySelector('.tabscon');
            this.tabadd = this.main.querySelector('.tabadd');
            this.init();
        }

        init() {
            this.updateNode();
            this.tabadd.onclick = this.addTab;
            for (let i = 0; i < this.lis.length; i++) {
                // console.log(this === that);
                this.lis[i].index = i;
                this.lis[i].onclick = this.toggleTab;
                // console.log(this.removd);
                this.removd[i].onclick = this.removeTab;
                this.spans[i].ondblclick = this.editTab;
                this.section[i].ondblclick = this.editTab;
            }
        }

        //重新获取元素
        updateNode() {
            this.removd = this.main.querySelectorAll('.icon-guanbi');
            this.lis = this.main.querySelectorAll('li');
            this.section = this.main.querySelectorAll('section');
            this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
        }

        toggleTab() {
            // console.log(that == this);
            // console.log(this);
            // console.log(that);
            that.clearClass();
            this.className = 'liactive';
            that.section[this.index].className = 'conactive';

        }

        clearClass() {
            for (let i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.section[i].className = '';
            }
        }

        addTab() {
            that.clearClass();
            let random = Math.random();
            let li = '<li class="liactive"><span>新选显卡</span><span class="iconfont icon-guanbi"></span></li>';
            let section = '<section class="conactive">测试' + random + '</section>';
            // console.log(this);    this==tabadd元素
            that.ul.insertAdjacentHTML('beforeend', li);
            that.tabscon.insertAdjacentHTML('beforeend', section);
            that.init();
        }

        removeTab(e) {
            e.stopPropagation();
            let index = this.parentNode.index;   //获取到父元素的下标即获取到li的下标
            that.lis[index].remove();
            that.section[index].remove();
            that.init();
            if (document.querySelector('.liactive')) return;   //如果删除的不是选中状态的li，则原来被选中的li的状态保持不变
            index--;
            that.lis[index] && that.lis[index].click();    //先有个判断  在自动调用点击事件
        }

        editTab() {
            let str = this.innerHTML;
            // 双击禁止选定文字
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            this.innerHTML = '<input type="text" />';
            let input = this.children[0];
            input.value = str;
            input.select();
            input.onblur = function () {
                this.parentNode.innerHTML = this.value;
            };
            input.onkeyup = function (e) {
                if (e.keyCode === 13) {
                    this.blur();  //自动调用
                }
            };

        }
    };

    new Tab('main')

})