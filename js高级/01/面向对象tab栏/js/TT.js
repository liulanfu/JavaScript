window.onload = function () {
    let that = '';
    class NewObj {
        constructor(id) {
            that = this;
            this.main = document.querySelector(id);
            this.tabadd = this.main.querySelector('.tabadd');
            this.ul = this.main.querySelector('ul');
            this.tabscon = this.main.querySelector('.tabscon');
            this.init();
        }

        init() {
            this.update();
            this.tabadd.onclick = this.add;
            for (let i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].onclick = this.toggle;
            }
        }

        update() {
            this.lis = this.main.querySelectorAll('ul li');
            this.sections = this.main.querySelectorAll('section');
        }

        toggle() {
            // console.log(this)
            that.removeClass();
            this.className = 'liactive';
            that.sections[this.index].className = 'conactive';

        }

        add() {
            that.removeClass();
            let random = Math.random();
            let li = ` <li class="liactive"><span>测试3</span><span class="iconfont icon-guanbi"></span></li>`;
            that.ul.insertAdjacentHTML('beforeend', li);

            let section = `<section class="conactive">测试${random}</section>`;
            that.tabscon.insertAdjacentHTML('beforeend', section);

            that.init();
        }

        //排他思想
        removeClass() {
            for (let i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.sections[i].className = '';
            }
        }

        clearNodes() {
            
        }

    }

    const obj = new NewObj('main')
}