// QQ表情插件
(function($){
	$.fn.qqFace = function(options){
		var defaults = {
			id : 'facebox',
			path : 'face/',
			assign : 'content',
			tip : 'em_'
		};
		var option = $.extend(defaults, options);
		var assign = $('#'+option.assign);
		var id = option.id;
		var path = option.path;
		var tip = option.tip;

		if(assign.length<=0){
			alert('缺少表情赋值对象。');
			return false;
		}

		var Manager = {
			insertHtml:function(html,type){

				var lastMemo=document.getElementById("memo"),lastEditor=assign;

				type=type||'memo';

				var control=type=='memo'?lastMemo:lastEditor;

				if(!control)return;

				control.focus();

				var selection=window.getSelection?window.getSelection():document.selection,

					range=selection.createRange?selection.createRange():selection.getRangeAt(0);


				//判断浏览器是ie，但不是ie9以上
				var browser = checkBrowser().split(":");
				var IEbrowser = checkBrowser().split(":")[0];
				var IEverson =  Number(checkBrowser().split(":")[1]);

				if(IEbrowser=="IE"&&IEverson<9){

					range.pasteHTML(html);

				}else{

					var node=document.createElement('span');

					node.innerHTML=html;

					range.insertNode(node);

					selection.addRange(range);

				}

			},

			insertImg:function(img){
				//var img="<img src='http://www.baidu.com/img/bdlogo.gif'/>";
				this.insertHtml(img,'editor');
			}

		}

		function checkBrowser()
		{
			var browserName=navigator.userAgent.toLowerCase();
			//var ua = navigator.userAgent.toLowerCase();
			var Sys = {};
			var rtn = false;

			if(/msie/i.test(browserName) && !/opera/.test(browserName)){
				strBrowser = "IE: "+browserName.match(/msie ([\d.]+)/)[1];
				rtn = true;
				//return true;
			}else if(/firefox/i.test(browserName)){
				strBrowser = "Firefox: " + browserName.match(/firefox\/([\d.]+)/)[1];;
				//return false;
			}else if(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)){
				strBrowser = "Chrome: " + browserName.match(/chrome\/([\d.]+)/)[1];
				//return false;
			}else if(/opera/i.test(browserName)){
				strBrowser = "Opera: " + browserName.match(/opera.([\d.]+)/)[1];
				//return false;
			}else if(/webkit/i.test(browserName) &&!(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))){
				strBrowser = "Safari: ";
				//return false;
			}else{
				strBrowser = "unKnow,未知浏览器 ";
				//return false;
			}
			strBrowser = strBrowser ;
			//alert(strBrowser)
			return strBrowser;
		}

		$(this).on("click",function(e){
			var strFace, labFace;
			if($('#'+id).length<=0){
				strFace = '<div id="'+id+'" style="position:absolute;display:none;z-index:1000;" class="qqFace">' +
					'<table border="0" cellspacing="0" cellpadding="0"><tr>';
				for(var i=1; i<=75; i++){
					labFace = '['+tip+i+']';
					strFace += '<td><img src="'+path+i+'.gif" onclick="$(\'#'+option.assign+'\').setCaret();$(\'#'+option.assign+'\').insertAtCaret(\'' + labFace + '\');" /></td>';
					if( i % 15 == 0 ) strFace += '</tr><tr>';
				}
				strFace += '</tr></table></div>';
			}
			$(this).parent().append(strFace);

			$('#'+id).show();

			$("#"+id).find("td").on("click", function () {
				var text = $(this).html();
				Manager.insertImg(text);
			})
			e.stopPropagation();
		});

		$(document).click(function(){
			$('#'+id).hide();
			$('#'+id).remove();
		});


	};

})(jQuery);