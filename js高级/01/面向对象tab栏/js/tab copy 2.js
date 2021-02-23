window.addEventListener('load', function () {
    /**
  1、抽象对象，初始化
  2、获取元素(对象绑定属性)
  3、定义初始化方法(init)，用来绑定事件，执行初始化的操作和方法
  4、调用初始化方法

  切换模块: toggleTab
    1、初始化函数中循环绑定事件
    2、当前点击的tab对应的section全部添加active相关类
    3、清除类的方法抽离出来复用

  添加模块：addTab
    1、添加点击以后，创建新的section和tab选项卡，添加到对应dom元素(insertAdjacentHTML[beforeend])
    2、新添加的元素默认带active类，其他所有元素active类清除(添加一开始就需要调用)
    3、新增选项卡事件不生效解决方法：新增的dom元素需要重新获取一遍,再绑定事件，
      可以单独放在一个方法里面，dom发生改变时候调用一下ok

  删除模块：removeTab
    1、点击x号，找到parentNode的li的索引号(阻止li的冒泡点击)，关闭按钮也要实时获取
    2、获取所有li，删除x号对应的index的li,section同样操作,然后重新获取dom元素
    3、当前删除的元素的index--个，添加active，可以直接让上一个li(tab)执行click事件
      (第0个就不用执行li的click事件)
    4、如果删除的不是选定状态的li的时候，原来的选定状态的li保持不变
  编辑功能：editTab
    1、双击以后，当前文本变为文本框(需要把文字内容带入)
    2、鼠标失去焦点以后，获取当前的input的value，input变为文本，值为input的值
    3、绑定键盘事件，如果是enter，触发blur事件
    4、section相同的逻辑实现编辑
 */

    let that;
    class Tab {
        constructor(id) {
            that = this;
            this.main = document.querySelector(id);
            this.ul = this.main.querySelector('ul');
            this.tabscon = this.main.querySelector('.tabscon');
            this.tabadd = this.main.querySelector('.tabadd');
            this.init();
        }

        init() {
            this.updateNodes();
            this.tabadd.onclick = this.addTab;
            for (let i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].onclick = this.toggleTab;
                this.remove[i].onclick = this.clearTab;
                this.span[i].ondblclick = this.editTab;
                this.section[i].ondblclick = this.editTab;
            }
        }

        //更新元素个数方法
        updateNodes() {
            this.lis = this.main.querySelectorAll('.fisrstnav ul li');
            this.section = this.main.querySelectorAll('.tabscon section');
            this.remove = this.main.querySelectorAll('ul .icon-guanbi');
            this.span = this.main.querySelectorAll('ul li span:first-Child');

        }

        //tab栏切换
        toggleTab() {
            that.clearClass();
            this.className = 'liactive';
            that.section[this.index].className = 'conactive';
        }

        //清除所有classname
        clearClass() {
            for (let i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.section[i].className = '';
            }
        }

        //添加
        addTab() {
            //调用清除类名的方法来清空其余的类名
            that.clearClass();
            //生成一个随机数
            let random = Math.random();
            //创建li,用insertAdjacentHTML('位置',元素)  
            let li = `<li class="liactive"><span>新的选项</span><span class="iconfont icon-guanbi"></span></li>`;
            that.ul.insertAdjacentHTML('beforeend', li);
            //创建section
            let section = `<section class="conactive">测试${random}</section>`;
            that.tabscon.insertAdjacentHTML('beforeend', section);
            //调用init（）方法使添加进来的元素有点击事件
            that.init();
        }

        //删除
        clearTab(e) {
            e.stopPropagation();
            let index = this.parentNode.index;
            that.lis[index].remove();
            that.section[index].remove();
            if (document.querySelector('.liactive')) return;
            index--;
            if (index < 0) index = 0;
            that.init()
            that.lis[index] && that.lis[index].click();

        }

        //编辑
        editTab() {
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            let value = this.innerHTML;
            this.innerHTML = `<input type="text" value="${value}" />`;
            let inp = this.children[0];
            inp.select();
            inp.onblur = function () {
                this.parentNode.innerHTML = this.value;
            };
            inp.onkeyup = function (e) {
                if (e.keyCode === 13) {
                    this.blur();
                }
            };
        }
    }

    new Tab('#tab');

});