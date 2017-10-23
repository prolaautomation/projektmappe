(function(){var e=function(e,s){function i(){this.constructor=e}for(var r in s)t.call(s,r)&&(e[r]=s[r]);return i.prototype=s.prototype,e.prototype=new i,e.__super__=s.prototype,e},t={}.hasOwnProperty;this.Chosen=function(t){function s(){return s.__super__.constructor.apply(this,arguments)}return e(s,t),s.prototype.setup=function(){return this.current_selectedIndex=this.form_field.selectedIndex,this.is_rtl=this.form_field.hasClassName("chosen-rtl")},s.prototype.set_default_values=function(){return s.__super__.set_default_values.call(this),this.single_temp=new Template('<a class="chosen-single chosen-default"><span>#{default}</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'),this.multi_temp=new Template('<ul class="chosen-choices"><li class="search-field"><input type="text" value="#{default}" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>'),this.no_results_temp=new Template('<li class="no-results">'+this.results_none_found+' "<span>#{terms}</span>"</li>')},s.prototype.set_up_html=function(){var e,t;return e=["chosen-container"],e.push("chosen-container-"+(this.is_multiple?"multi":"single")),this.inherit_select_classes&&this.form_field.className&&e.push(this.form_field.className),this.is_rtl&&e.push("chosen-rtl"),t={"class":e.join(" "),style:"width: "+this.container_width()+";",title:this.form_field.title},this.form_field.id.length&&(t.id=this.form_field.id.replace(/[^\w]/g,"_")+"_chosen"),this.container=this.is_multiple?new Element("div",t).update(this.multi_temp.evaluate({"default":this.default_text})):new Element("div",t).update(this.single_temp.evaluate({"default":this.default_text})),this.form_field.hide().insert({after:this.container}),this.dropdown=this.container.down("div.chosen-drop"),this.search_field=this.container.down("input"),this.search_results=this.container.down("ul.chosen-results"),this.search_field_scale(),this.search_no_results=this.container.down("li.no-results"),this.is_multiple?(this.search_choices=this.container.down("ul.chosen-choices"),this.search_container=this.container.down("li.search-field")):(this.search_container=this.container.down("div.chosen-search"),this.selected_item=this.container.down(".chosen-single")),this.results_build(),this.set_tab_index(),this.set_label_behavior()},s.prototype.on_ready=function(){return this.form_field.fire("chosen:ready",{chosen:this})},s.prototype.register_observers=function(){return this.container.observe("touchstart",function(e){return function(t){return e.container_mousedown(t),t.preventDefault()}}(this)),this.container.observe("touchend",function(e){return function(t){return e.container_mouseup(t),t.preventDefault()}}(this)),this.container.observe("mousedown",function(e){return function(t){return e.container_mousedown(t)}}(this)),this.container.observe("mouseup",function(e){return function(t){return e.container_mouseup(t)}}(this)),this.container.observe("mouseenter",function(e){return function(t){return e.mouse_enter(t)}}(this)),this.container.observe("mouseleave",function(e){return function(t){return e.mouse_leave(t)}}(this)),this.search_results.observe("mouseup",function(e){return function(t){return e.search_results_mouseup(t)}}(this)),this.search_results.observe("mouseover",function(e){return function(t){return e.search_results_mouseover(t)}}(this)),this.search_results.observe("mouseout",function(e){return function(t){return e.search_results_mouseout(t)}}(this)),this.search_results.observe("mousewheel",function(e){return function(t){return e.search_results_mousewheel(t)}}(this)),this.search_results.observe("DOMMouseScroll",function(e){return function(t){return e.search_results_mousewheel(t)}}(this)),this.search_results.observe("touchstart",function(e){return function(t){return e.search_results_touchstart(t)}}(this)),this.search_results.observe("touchmove",function(e){return function(t){return e.search_results_touchmove(t)}}(this)),this.search_results.observe("touchend",function(e){return function(t){return e.search_results_touchend(t)}}(this)),this.form_field.observe("chosen:updated",function(e){return function(t){return e.results_update_field(t)}}(this)),this.form_field.observe("chosen:activate",function(e){return function(t){return e.activate_field(t)}}(this)),this.form_field.observe("chosen:open",function(e){return function(t){return e.container_mousedown(t)}}(this)),this.form_field.observe("chosen:close",function(e){return function(t){return e.input_blur(t)}}(this)),this.search_field.observe("blur",function(e){return function(t){return e.input_blur(t)}}(this)),this.search_field.observe("keyup",function(e){return function(t){return e.keyup_checker(t)}}(this)),this.search_field.observe("keydown",function(e){return function(t){return e.keydown_checker(t)}}(this)),this.search_field.observe("focus",function(e){return function(t){return e.input_focus(t)}}(this)),this.search_field.observe("cut",function(e){return function(t){return e.clipboard_event_checker(t)}}(this)),this.search_field.observe("paste",function(e){return function(t){return e.clipboard_event_checker(t)}}(this)),this.is_multiple?this.search_choices.observe("click",function(e){return function(t){return e.choices_click(t)}}(this)):this.container.observe("click",function(){return function(e){return e.preventDefault()}}())},s.prototype.destroy=function(){return this.container.ownerDocument.stopObserving("click",this.click_test_action),this.form_field.stopObserving(),this.container.stopObserving(),this.search_results.stopObserving(),this.search_field.stopObserving(),null!=this.form_field_label&&this.form_field_label.stopObserving(),this.is_multiple?(this.search_choices.stopObserving(),this.container.select(".search-choice-close").each(function(e){return e.stopObserving()})):this.selected_item.stopObserving(),this.search_field.tabIndex&&(this.form_field.tabIndex=this.search_field.tabIndex),this.container.remove(),this.form_field.show()},s.prototype.search_field_disabled=function(){return this.is_disabled=this.form_field.disabled,this.is_disabled?(this.container.addClassName("chosen-disabled"),this.search_field.disabled=!0,this.is_multiple||this.selected_item.stopObserving("focus",this.activate_action),this.close_field()):(this.container.removeClassName("chosen-disabled"),this.search_field.disabled=!1,this.is_multiple?void 0:this.selected_item.observe("focus",this.activate_action))},s.prototype.container_mousedown=function(e){if(!this.is_disabled&&(e&&"mousedown"===e.type&&!this.results_showing&&e.stop(),null==e||!e.target.hasClassName("search-choice-close")))return this.active_field?this.is_multiple||!e||e.target!==this.selected_item&&!e.target.up("a.chosen-single")||this.results_toggle():(this.is_multiple&&this.search_field.clear(),this.container.ownerDocument.observe("click",this.click_test_action),this.results_show()),this.activate_field()},s.prototype.container_mouseup=function(e){if("ABBR"===e.target.nodeName&&!this.is_disabled)return this.results_reset(e)},s.prototype.search_results_mousewheel=function(e){var t;if(null!=(t=e.deltaY||-e.wheelDelta||e.detail))return e.preventDefault(),"DOMMouseScroll"===e.type&&(t*=40),this.search_results.scrollTop=t+this.search_results.scrollTop},s.prototype.blur_test=function(){if(!this.active_field&&this.container.hasClassName("chosen-container-active"))return this.close_field()},s.prototype.close_field=function(){return this.container.ownerDocument.stopObserving("click",this.click_test_action),this.active_field=!1,this.results_hide(),this.container.removeClassName("chosen-container-active"),this.clear_backstroke(),this.show_search_field_default(),this.search_field_scale()},s.prototype.activate_field=function(){return this.container.addClassName("chosen-container-active"),this.active_field=!0,this.search_field.value=this.search_field.value,this.search_field.focus()},s.prototype.test_active_click=function(e){return e.target.up(".chosen-container")===this.container?this.active_field=!0:this.close_field()},s.prototype.results_build=function(){return this.parsing=!0,this.selected_option_count=null,this.results_data=SelectParser.select_to_array(this.form_field),this.is_multiple?this.search_choices.select("li.search-choice").invoke("remove"):this.is_multiple||(this.single_set_selected_text(),this.disable_search||this.form_field.options.length<=this.disable_search_threshold?(this.search_field.readOnly=!0,this.container.addClassName("chosen-container-single-nosearch")):(this.search_field.readOnly=!1,this.container.removeClassName("chosen-container-single-nosearch"))),this.update_results_content(this.results_option_build({first:!0})),this.search_field_disabled(),this.show_search_field_default(),this.search_field_scale(),this.parsing=!1},s.prototype.result_do_highlight=function(e){var t,s,i,r,n;return this.result_clear_highlight(),this.result_highlight=e,this.result_highlight.addClassName("highlighted"),i=parseInt(this.search_results.getStyle("maxHeight"),10),n=this.search_results.scrollTop,r=i+n,s=this.result_highlight.positionedOffset().top,t=s+this.result_highlight.getHeight(),t>=r?this.search_results.scrollTop=t-i>0?t-i:0:s<n?this.search_results.scrollTop=s:void 0},s.prototype.result_clear_highlight=function(){return this.result_highlight&&this.result_highlight.removeClassName("highlighted"),this.result_highlight=null},s.prototype.results_show=function(){return this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field.fire("chosen:maxselected",{chosen:this}),!1):(this.container.addClassName("chosen-with-drop"),this.results_showing=!0,this.search_field.focus(),this.search_field.value=this.search_field.value,this.winnow_results(),this.form_field.fire("chosen:showing_dropdown",{chosen:this}))},s.prototype.update_results_content=function(e){return this.search_results.update(e)},s.prototype.results_hide=function(){return this.results_showing&&(this.result_clear_highlight(),this.container.removeClassName("chosen-with-drop"),this.form_field.fire("chosen:hiding_dropdown",{chosen:this})),this.results_showing=!1},s.prototype.set_tab_index=function(){var e;if(this.form_field.tabIndex)return e=this.form_field.tabIndex,this.form_field.tabIndex=-1,this.search_field.tabIndex=e},s.prototype.set_label_behavior=function(){if(this.form_field_label=this.form_field.up("label"),null==this.form_field_label&&(this.form_field_label=$$("label[for='"+this.form_field.id+"']").first()),null!=this.form_field_label)return this.form_field_label.observe("click",function(e){return function(t){return e.is_multiple?e.container_mousedown(t):e.activate_field()}}(this))},s.prototype.show_search_field_default=function(){return this.is_multiple&&this.choices_count()<1&&!this.active_field?(this.search_field.value=this.default_text,this.search_field.addClassName("default")):(this.search_field.value="",this.search_field.removeClassName("default"))},s.prototype.search_results_mouseup=function(e){var t;if(t=e.target.hasClassName("active-result")?e.target:e.target.up(".active-result"))return this.result_highlight=t,this.result_select(e),this.search_field.focus()},s.prototype.search_results_mouseover=function(e){var t;if(t=e.target.hasClassName("active-result")?e.target:e.target.up(".active-result"))return this.result_do_highlight(t)},s.prototype.search_results_mouseout=function(e){if(e.target.hasClassName("active-result")||e.target.up(".active-result"))return this.result_clear_highlight()},s.prototype.choice_build=function(e){var t,s;return t=new Element("li",{"class":"search-choice"}).update("<span>"+this.choice_label(e)+"</span>"),e.disabled?t.addClassName("search-choice-disabled"):(s=new Element("a",{href:"#","class":"search-choice-close",rel:e.array_index}),s.observe("click",function(e){return function(t){return e.choice_destroy_link_click(t)}}(this)),t.insert(s)),this.search_container.insert({before:t})},s.prototype.choice_destroy_link_click=function(e){if(e.preventDefault(),e.stopPropagation(),!this.is_disabled)return this.choice_destroy(e.target)},s.prototype.choice_destroy=function(e){if(this.result_deselect(e.readAttribute("rel")))return this.show_search_field_default(),this.is_multiple&&this.choices_count()>0&&this.search_field.value.length<1&&this.results_hide(),e.up("li").remove(),this.search_field_scale()},s.prototype.results_reset=function(){if(this.reset_single_select_options(),this.form_field.options[0].selected=!0,this.single_set_selected_text(),this.show_search_field_default(),this.results_reset_cleanup(),"function"==typeof Event.simulate&&this.form_field.simulate("change"),this.active_field)return this.results_hide()},s.prototype.results_reset_cleanup=function(){var e;if(this.current_selectedIndex=this.form_field.selectedIndex,e=this.selected_item.down("abbr"))return e.remove()},s.prototype.result_select=function(e){var t,s;if(this.result_highlight)return t=this.result_highlight,this.result_clear_highlight(),this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field.fire("chosen:maxselected",{chosen:this}),!1):(this.is_multiple?t.removeClassName("active-result"):this.reset_single_select_options(),t.addClassName("result-selected"),s=this.results_data[t.getAttribute("data-option-array-index")],s.selected=!0,this.form_field.options[s.options_index].selected=!0,this.selected_option_count=null,this.is_multiple?this.choice_build(s):this.single_set_selected_text(this.choice_label(s)),(e.metaKey||e.ctrlKey)&&this.is_multiple||this.results_hide(),this.show_search_field_default(),"function"!=typeof Event.simulate||!this.is_multiple&&this.form_field.selectedIndex===this.current_selectedIndex||this.form_field.simulate("change"),this.current_selectedIndex=this.form_field.selectedIndex,e.preventDefault(),this.search_field_scale())},s.prototype.single_set_selected_text=function(e){return null==e&&(e=this.default_text),e===this.default_text?this.selected_item.addClassName("chosen-default"):(this.single_deselect_control_build(),this.selected_item.removeClassName("chosen-default")),this.selected_item.down("span").update(e)},s.prototype.result_deselect=function(e){var t;return t=this.results_data[e],!this.form_field.options[t.options_index].disabled&&(t.selected=!1,this.form_field.options[t.options_index].selected=!1,this.selected_option_count=null,this.result_clear_highlight(),this.results_showing&&this.winnow_results(),"function"==typeof Event.simulate&&this.form_field.simulate("change"),this.search_field_scale(),!0)},s.prototype.single_deselect_control_build=function(){if(this.allow_single_deselect)return this.selected_item.down("abbr")||this.selected_item.down("span").insert({after:'<abbr class="search-choice-close"></abbr>'}),this.selected_item.addClassName("chosen-single-with-deselect")},s.prototype.get_search_text=function(){return this.search_field.value.strip().escapeHTML()},s.prototype.winnow_results_set_highlight=function(){var e;if(this.is_multiple||(e=this.search_results.down(".result-selected.active-result")),null==e&&(e=this.search_results.down(".active-result")),null!=e)return this.result_do_highlight(e)},s.prototype.no_results=function(e){return this.search_results.insert(this.no_results_temp.evaluate({terms:e})),this.form_field.fire("chosen:no_results",{chosen:this})},s.prototype.no_results_clear=function(){var e,t;for(e=null,t=[];e=this.search_results.down(".no-results");)t.push(e.remove());return t},s.prototype.keydown_arrow=function(){var e;return this.results_showing&&this.result_highlight?(e=this.result_highlight.next(".active-result"))?this.result_do_highlight(e):void 0:this.results_show()},s.prototype.keyup_arrow=function(){var e,t,s;return this.results_showing||this.is_multiple?this.result_highlight?(s=this.result_highlight.previousSiblings(),e=this.search_results.select("li.active-result"),t=s.intersect(e),t.length?this.result_do_highlight(t.first()):(this.choices_count()>0&&this.results_hide(),this.result_clear_highlight())):void 0:this.results_show()},s.prototype.keydown_backstroke=function(){var e;return this.pending_backstroke?(this.choice_destroy(this.pending_backstroke.down("a")),this.clear_backstroke()):(e=this.search_container.siblings().last())&&e.hasClassName("search-choice")&&!e.hasClassName("search-choice-disabled")?(this.pending_backstroke=e,this.pending_backstroke&&this.pending_backstroke.addClassName("search-choice-focus"),this.single_backstroke_delete?this.keydown_backstroke():this.pending_backstroke.addClassName("search-choice-focus")):void 0},s.prototype.clear_backstroke=function(){return this.pending_backstroke&&this.pending_backstroke.removeClassName("search-choice-focus"),this.pending_backstroke=null},s.prototype.keydown_checker=function(e){var t,s;switch(s=null!=(t=e.which)?t:e.keyCode,this.search_field_scale(),8!==s&&this.pending_backstroke&&this.clear_backstroke(),s){case 8:this.backstroke_length=this.search_field.value.length;break;case 9:this.results_showing&&!this.is_multiple&&this.result_select(e),this.mouse_on_container=!1;break;case 13:this.results_showing&&e.preventDefault();break;case 32:this.disable_search&&e.preventDefault();break;case 38:e.preventDefault(),this.keyup_arrow();break;case 40:e.preventDefault(),this.keydown_arrow()}},s.prototype.search_field_scale=function(){var e,t,s,i,r,n,o,h;if(this.is_multiple){for(0,h=0,n="position:absolute; left: -1000px; top: -1000px; display:none;",o=["font-size","font-style","font-weight","font-family","line-height","text-transform","letter-spacing"],s=0,i=o.length;s<i;s++)r=o[s],n+=r+":"+this.search_field.getStyle(r)+";";return e=new Element("div",{style:n}).update(this.search_field.value.escapeHTML()),document.body.appendChild(e),h=Element.measure(e,"width")+25,e.remove(),t=this.container.getWidth(),h>t-10&&(h=t-10),this.search_field.setStyle({width:h+"px"})}},s}(AbstractChosen)}).call(this);