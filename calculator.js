
// querySelectorAll返回一个数组需要一个选择器字符串
// 数组里是一个html里dom节点抽象的数据结构
var keys = document.querySelectorAll('#calculator span');
var screen = document.querySelector('.screen');
var operator = document.querySelectorAll('.operator');
//flag,如果flag==true，则代表之前的一个输入是运算符
var flag = false;
// 如果afterEval为真，表示刚进行过一次等号操作
var afterEval = false;



for (var i = keys.length - 1; i >= 0; i--) {
	// 拿到数组中的第i项
	var element = keys[i];	
	// onclick指当按钮被点击时，会调用的函数
	element.onclick = function (arg) {
		// console.log(this.innerHTML);
		// 判断当前按钮是不是clear，如果是则清空屏幕
		if(this.innerHTML == 'C'){
			screen.innerHTML = "";
			flag = false;
		}else if (this.innerHTML == '=') {
			if(flag){
				return;
			}
			// 判断是不是等于，是则运算结果
			screen.innerHTML = eval(screen.innerHTML);
			flag = false;
			afterEval = true;
		}else{		
			// 如果是运算符
			if(this.className == 'operator'){
				// console.log('test');
				// 如果屏幕为空，禁止输入运算符的乘法和除法
				if (screen.innerHTML == '' &&( this.innerHTML == '*' || this.innerHTML == '/')){
					return;
				}
				// 之前是不是运算符
				if(flag) {
					return;
				}
				//这次是运算符
				flag = true;
				//将afterEval还原成false
				afterEval = false;
				//按下的时候，运算符保持按下状态
				this.style.backgroundColor = "#9c89f6";
				this.style.boxShadow="none";
				this.style.color="white";
			}else {
				// 如果数字的上一次是符号
				if(flag){
					// 把所有的符号都变回原来的模式
					for (var i = operator.length - 1; i >= 0; i--) {
						operator[i].style.backgroundColor = "#FFF0F5";
						operator[i].style.boxShadow="0px 4px rgba(0,0,0,2)";
						operator[i].style.color="#888";	
					}
				}
				// 这次不是运算符
				flag = false;
				//刚进行一次等号操作，则再输入数字的话屏幕清空
				if(afterEval){
				screen.innerHTML = '';
				afterEval = false;
				}
			}
			// 如果是数字或者运算符,则追加到原来屏幕的字符串后面
			screen.innerHTML += this.innerHTML;
		}
	}
}

