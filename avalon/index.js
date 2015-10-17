require('avalon-mobile',function(avalon){
	var start,offset,page_width=320,page_num=3,cursor_step=1/page_num*100;
	var slide_switch=avalon.define({
		$id:'slide_switch',
		cur:0,//当前页
		heights:[],
		offset:0,//页面偏移
		cursor_pos:0,//tab游标偏移
		turn:function(cur){
			slide_switch.cur=cur;
			slide_switch.offset=page_width*slide_switch.cur;
			slide_switch.cursor_pos=cursor_step*slide_switch.cur;
		},
		start:function(e){
			start=e.touches[0].clientX;
		},
		move:function(e){
			offset=e.touches[0].clientX-start;
			slide_switch.offset=page_width*slide_switch.cur-offset;
			slide_switch.cursor_pos=cursor_step*slide_switch.cur-offset/(page_width*page_num)*100;
		},
		end:function(e){
			if(slide_switch.offset<0||slide_switch.offset>page_width*(page_num-1)||Math.abs(offset)<page_width/2){
				slide_switch.offset=page_width*slide_switch.cur;
				slide_switch.cursor_pos=cursor_step*slide_switch.cur;
				e.stopPropagation();
			}
		}
	});
	var heights=[],win_h=document.documentElement.clientHeight,tab_h=avalon($('tab')).outerHeight();
	for(var i=0;i<page_num;i++){
		heights.push(win_h-tab_h+26);
	}
	slide_switch.heights=heights;
	avalon.scan();
});