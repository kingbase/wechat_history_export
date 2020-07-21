<div id="js_profile_history_container">
    <div class="weui_msg_card_list" id="js_history_list"></div>

    <div class="weui-empty-tips" style="display:none;" id="js_no_data">暂无数据</div>

    <div class="loadmore" id="js_loading">
        <div class="tips_wrp">
            <i class="weui-loading"></i>
            <span class="tips">正在加载</span>
        </div>
    </div>
    <div class="loadmore with_line" style="display:none;" id="js_nomore">
        <div class="tips_wrp">
            <span class="tips js_no_more_msg" style="display: none;">已无更多</span>
            <span class="tips js_need_add_contact" style="display: none;">关注公众帐号，接收更多消息</span>
        </div>
    </div>
</div>

<script type="text/html" id="js_profile_history_tpl">
{{each list as value idx}}
    {{if value && value.comm_msg_info}}
        {{if historyType==\'video\' && value.app_msg_ext_info && value.app_msg_ext_info.vid}} <!-- 直接播放视频 -->
        <div class="weui_msg_card js_card js_video{{if value.app_msg_ext_info.item_show_type===0}} js_not_jump{{/if}}" msgid="{{value.comm_msg_info.id}}" hrefs="{{value.app_msg_ext_info.content_url}}">
            <div class="weui_media_box video_card">
              <div class="weui_media_bd">
                <h4 class="weui_media_title js_media" data-type="VIDEO">
                  {{value.app_msg_ext_info.title}}
                </h4>
                <div id="WXPLAYABLEVIDEO{{videoLen + idx}}" class="js_playable wx_video_wrp" style="height:{{playableVideoHeight}}px;position: relative;"></div>
                <p class="weui_media_extra_info">
                    {{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}
                    {{if value.app_msg_ext_info.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}} 
                    {{if value.app_msg_ext_info.item_show_type===0}}<a class="weui-media__readmore js_go_appmsg" href="javascript:;" data-href="{{value.app_msg_ext_info.content_url}}">阅读来源文章</a>{{/if}}
                </p>
              </div>
            </div>
        </div>
        {{else if historyType==\'video\' && value.app_msg_ext_info && value.comm_msg_info && value.app_msg_ext_info.content_url && value.app_msg_ext_info.title && value.app_msg_ext_info.cover && value.app_msg_ext_info.del_flag!=4}} <!-- 视屏筛选，无法直接播放的卡片视频样式 -->
        <div class="weui_msg_card js_card js_video" msgid="{{value.comm_msg_info.id}}" hrefs="{{value.app_msg_ext_info.content_url}}">
            <div class="weui_media_box video_card js_media" data-type="VIDEO">
              <div class="weui_media_bd">
                <h4 class="weui_media_title">
                  {{value.app_msg_ext_info.title}}
                </h4>
                <div class="video_cover" style="background-image:url({{handleCdnImg value.app_msg_ext_info.cover}});height:{{playableVideoHeight}}px;"></div>
                {{if value.comm_msg_info.datetime}}
                <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}{{if value.app_msg_ext_info.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}}</p>
                {{/if}}
              </div>
            </div>
        </div>
        {{else if historyType==\'video\' && value.app_msg_ext_info && value.app_msg_ext_info.del_flag==4}}
        <div class="weui_msg_card" style="display: none">
            <div id="WXAPPMSG{{value.comm_msg_info.id}}" class="weui_media_box video_card js_appmsg media_del" hrefs="{{value.app_msg_ext_info.content_url}}">
                <div class="weui_media_bd js_media" data-type="APPMSG">
                    <h4 class="weui_media_title" hrefs="{{value.app_msg_ext_info.content_url}}">内容违规已被删除</h4>
                    <p class="weui_media_desc"></p>
                    <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>
                </div>
            </div>
        </div>
        {{else if value.comm_msg_info.type==1}}    <!-- 文字 -->
        <div class="weui_msg_card js_card" msgid="{{value.comm_msg_info.id}}">
            <div class="weui_msg_card_hd">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</div>
            <div class="weui_msg_card_bd">
                <div class="weui_media_box text js_appmsg">
                    <div class="weui_media_bd js_media" data-type="TEXT">
                        <div>
                            {{handleTextEmoji value.comm_msg_info.content}}
                        </div>
                    </div>
                    <div class="weui_media_ft">
                        <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>
                    </div>
                </div>
            </div>
        </div>
        {{else if value.comm_msg_info.type==3}}    <!-- 图片 -->
        <div class="weui_msg_card js_card" msgid="{{value.comm_msg_info.id}}">
            <div class="weui_msg_card_hd">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</div>
            <div class="weui_msg_card_bd">
                <div id="WXIMG{{value.comm_msg_info.id}}" class="weui_media_box img js_appmsg">
                    <div class="weui_media_bd js_media" data-type="IMG">
                      {{if value.image_msg_ext_info && value.image_msg_ext_info.cdn_url}}
                      <img src="{{handleCdnImg value.image_msg_ext_info.cdn_url}}" data-msgid="{{value.comm_msg_info.id}}" data-s="640" data-cdnsrc="{{handleCdnImg value.image_msg_ext_info.cdn_url}}">
                      {{else}}
                      <img src="https://mp.weixin.qq.com/mp/getmediadata?__biz={{biz}}&type=img&mode=normal&msgid={{value.comm_msg_info.id}}&uin={{uin}}&key={{key}}&openkey={{openkey}}#wechat_redirect" data-msgid="{{value.comm_msg_info.id}}" data-s="640">
                      {{/if}}
                    </div>
                    <div class="weui_media_ft">
                        <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>
                    </div>
                </div>
            </div>
        </div>
        {{else if value.comm_msg_info.type==34}}    <!-- 语音 -->
        <div class="weui_msg_card js_card" msgid="{{value.comm_msg_info.id}}">
            <div class="weui_msg_card_hd">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</div>
            <div class="weui_msg_card_bd">
                <div id="WXVOICE{{value.comm_msg_info.id}}" class="weui_media_box appmsg audio_msg_primary js_appmsg">
                    <div class="weui_media_hd js_icon js_media" data-type="AUDIO">
                        <audio fileid="{{value.voice_msg_ext_info.fileid}}" preload data-time=\'{{value.voice_msg_ext_info.play_length}}\' src="/mp/getmediadata?__biz={{biz}}&type=voice&msgid={{value.comm_msg_info.id}}&uin={{uin}}&key={{key}}&openkey={{openkey}}">
                            not support</audio>
                    </div>
                    <div class="weui_media_bd js_media" data-type="AUDIO">
                        <h4 class="weui_media_title">
                            {{if !value.voice_msg_ext_info.title}}
                                语音                            {{else}}
                                {{value.voice_msg_ext_info.title}}
                            {{/if}}
                        </h4>
                        <p class="weui_media_desc"></p>
                        <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>
                    </div>
                </div>
            </div>
        </div>
        {{else if value.comm_msg_info.type==49}}
        <div class="weui_msg_card js_card" msgid="{{value.comm_msg_info.id}}">
            <div class="weui_msg_card_hd">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</div>
            <div class="weui_msg_card_bd">
                {{if value.app_msg_ext_info.subtype == 9}} <!-- 图文 -->
                    {{if value.app_msg_ext_info.del_flag == 4}} <!-- 2-用户删除未群发素材 3-用户删除已群发文章 4-运营删除 -->
                    <div id="WXAPPMSG{{value.comm_msg_info.id}}" class="weui_media_box appmsg js_appmsg media_del" hrefs="{{value.app_msg_ext_info.content_url}}" style="display: none">
                        <span class="weui_media_hd js_media" hrefs="{{value.app_msg_ext_info.content_url}}" data-type="APPMSG"></span>
                        <div class="weui_media_bd js_media" data-type="APPMSG">
                            <h4 class="weui_media_title" hrefs="{{value.app_msg_ext_info.content_url}}">内容违规已被删除</h4>
                            <p class="weui_media_desc"></p>
                            <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>
                        </div>
                    </div>
                    {{else}}
                        {{if value.app_msg_ext_info.item_show_type == 5}} <!-- 视频分享页 -->
                        <div id="WXAPPMSG{{value.comm_msg_info.id}}" class="weui_media_box appmsg js_video {{if (!value.app_msg_ext_info.malicious_title_reason_id || value.app_msg_ext_info.malicious_content_type == 1)}}video_msg{{/if}}" hrefs="{{value.app_msg_ext_info.content_url}}" data-t="5">
                            {{if value.app_msg_ext_info.cover}}
                            <span class="weui_media_hd js_media" style="background-image:url({{handleCdnImg value.app_msg_ext_info.cover value.app_msg_ext_info.malicious_content_type value.app_msg_ext_info.malicious_title_reason_id}})" data-s="640" hrefs="{{value.app_msg_ext_info.content_url}}" data-type="VIDEO"></span>
                            {{/if}}
                            <div class="weui_media_bd js_media" data-type="VIDEO">
                                <h4 class="weui_media_title" hrefs="{{value.app_msg_ext_info.content_url}}">
                                {{if value.app_msg_ext_info.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}}
                                {{handleTitle value.app_msg_ext_info.title value.app_msg_ext_info.malicious_content_type value.app_msg_ext_info.malicious_title_reason_id}}
                                </h4>
                                <p class="weui_media_desc">{{=value.app_msg_ext_info.digest}}</p>
                                <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}{{if value.app_msg_ext_info.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}}</p>
                            </div>
                        </div>
                        {{else if value.app_msg_ext_info.item_show_type == 7}} <!-- 语音分享页 -->
                        <div id="WXVOICE{{value.comm_msg_info.id}}" class="weui_media_box appmsg audio_msg_primary js_appmsg {{if value.app_msg_ext_info.malicious_title_reason_id != 1 && value.app_msg_ext_info.malicious_title_reason_id}}media_warn{{/if}}" hrefs="{{value.app_msg_ext_info.content_url}}" data-t="7">
                            <div class="weui_media_hd js_icon js_media" data-type="AUDIO">
                                {{if !value.app_msg_ext_info.malicious_title_reason_id || value.app_msg_ext_info.malicious_title_reason_id <= 0}}
                                <audio fileid="{{value.app_msg_ext_info.audio_fileid}}" preload data-time=\'{{value.app_msg_ext_info.duration}}\' src="{{value.app_msg_ext_info.play_url}}">
                                    not support</audio>
                                {{/if}}
                            </div>
                            <div class="weui_media_bd js_media" data-type="AUDIO">
                                <h4 class="weui_media_title">
                                {{handleTitle value.app_msg_ext_info.title value.app_msg_ext_info.malicious_content_type value.app_msg_ext_info.malicious_title_reason_id}}</h4>
                                <p class="weui_media_desc">{{=value.app_msg_ext_info.digest}}</p>
                                <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>
                            </div>
                        </div>
                        {{else if value.app_msg_ext_info.item_show_type == 8}} <!-- 图片分享页 -->
                        <div id="WXIMG{{value.comm_msg_info.id}}" class="weui_media_box appmsg img js_appmsg" hrefs="{{value.app_msg_ext_info.content_url}}" data-t="8">
                            {{if value.app_msg_ext_info.cover}}
                            <span class="weui_media_hd js_media" style="background-image:url({{handleCdnImg value.app_msg_ext_info.cover value.app_msg_ext_info.malicious_content_type value.app_msg_ext_info.malicious_title_reason_id}})" data-s="640" data-type="IMG">
                            {{else}}
                            <span class="weui_media_hd js_media" style="background-image:url(https://mp.weixin.qq.com/mp/getmediadata?__biz={{biz}}&type=img&mode=normal&msgid={{value.comm_msg_info.id}}&uin={{uin}}&key={{key}}&openkey={{openkey}}#wechat_redirect)" data-s="640" data-type="IMG">
                            {{/if}}
                            </span>
                            <div class="weui_media_bd js_media" data-type="IMG">
                                <h4 class="weui_media_title" hrefs="{{value.app_msg_ext_info.content_url}}">
                                    {{handleTitle value.app_msg_ext_info.title value.app_msg_ext_info.malicious_content_type value.app_msg_ext_info.malicious_title_reason_id}}
                                </h4>
                                <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>
                            </div>
                        </div>
                        {{else if value.app_msg_ext_info.item_show_type == 10}} <!-- 文字分享页 -->
                        <div id="WXIMG{{value.comm_msg_info.id}}" class="weui_media_box text js_appmsg" hrefs="{{value.app_msg_ext_info.content_url}}" data-t="10">
                            <div class="weui_media_bd js_media" data-type="TEXT">
                              <div class="weui_media_text">
                                {{handleTextEmoji value.app_msg_ext_info.title value.app_msg_ext_info.item_show_type}}
                              </div>
                            </div>
                            <div class="weui_media_ft js_media" data-type="TEXT">
                                <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>
                            </div>
                        </div>
                        {{else}} <!-- 普通图文 -->
                        <div id="WXAPPMSG{{value.comm_msg_info.id}}" class="weui_media_box appmsg js_appmsg" hrefs="{{value.app_msg_ext_info.content_url}}" data-t="0">
                            {{if value.app_msg_ext_info.cover}}
                            <span class="weui_media_hd js_media" style="background-image:url({{handleCdnImg value.app_msg_ext_info.cover value.app_msg_ext_info.malicious_content_type value.app_msg_ext_info.malicious_title_reason_id}})" data-s="640" hrefs="{{value.app_msg_ext_info.content_url}}" data-type="APPMSG">
                            </span>
                            {{/if}}
                            <div class="weui_media_bd js_media" data-type="APPMSG">
                                <h4 class="weui_media_title" hrefs="{{value.app_msg_ext_info.content_url}}">
                                {{if value.app_msg_ext_info.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}}
                                {{if value.app_msg_ext_info.title}}
                                    {{handleTitle value.app_msg_ext_info.title value.app_msg_ext_info.malicious_content_type value.app_msg_ext_info.malicious_title_reason_id}}
                                {{else}}
                                    {{dateFormat value.comm_msg_info.datetime*1000 \'yyyy/MM/dd\'}}
                                {{/if}}
                                </h4>
                                <p class="weui_media_desc">{{=value.app_msg_ext_info.digest}}</p>
                                <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}{{if value.app_msg_ext_info.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}}</p>
                            </div>
                        </div>
                        {{/if}}
                    {{/if}}
                {{else if value.app_msg_ext_info.subtype == 16}} <!-- 视频 -->
                <div id="WXVIDEO{{value.comm_msg_info.id}}" class="weui_media_box video js_video" hrefs="{{value.app_msg_ext_info.content_url}}">
                    <div class="weui_media_hd js_media" data-type="VIDEO">
                        <span class="video_cover" style="background-image:url({{handleCdnImg value.app_msg_ext_info.cover}});height:{{height}}px;"></span>
                        <div class="video_switch">
                            {{if value.app_msg_ext_info.duration}}
                            <span class="video_time_info">{{handleVideoTime value.app_msg_ext_info.duration}}</span>
                            {{/if}}
                        </div>
                    </div>
                    <div class="weui_media_bd js_media" data-type="VIDEO">
                        <p class="weui_media_title">{{value.app_msg_ext_info.title}}</p>
                    </div>
                    <div class="weui_media_ft">
                        <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>
                    </div>
                </div>
                {{/if}}

                {{each value.app_msg_ext_info.multi_app_msg_item_list as subvalue subkey}}
                {{if subvalue.del_flag == 4}}
                <div class="weui_media_box appmsg js_appmsg media_del" hrefs="{{subvalue.content_url}}" style="display: none">
                    <span class="weui_media_hd js_media" data-type="APPMSG"></span>
                    <div class="weui_media_bd js_media" data-type="APPMSG">
                        <h4 class="weui_media_title" hrefs="{{subvalue.content_url}}">内容违规已被删除</h4>
                        <p class="weui_media_desc"></p>
                        <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>
                    </div>
                </div>
                {{else}}

                    {{if subvalue.item_show_type == 5}} <!-- 视频分享页 -->
                    <div id="WXAPPMSG{{value.comm_msg_info.id}}" class="weui_media_box appmsg js_video {{if (!subvalue.malicious_title_reason_id || subvalue.malicious_content_type == 1)}}video_msg{{/if}}" hrefs="{{subvalue.content_url}}" data-t="5">
                        {{if subvalue.cover}}
                        <span class="weui_media_hd js_media" style="background-image:url({{handleCdnImg subvalue.cover subvalue.malicious_content_type subvalue.malicious_title_reason_id}})" data-s="640" hrefs="{{subvalue.content_url}}" data-type="VIDEO"></span>
                        {{/if}}
                        <div class="weui_media_bd js_media" data-type="VIDEO">
                            <h4 class="weui_media_title" hrefs="{{subvalue.content_url}}">
                            {{if subvalue.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}}
                            {{handleTitle subvalue.title subvalue.malicious_content_type subvalue.malicious_title_reason_id}}
                            </h4>
                            <p class="weui_media_desc">{{=subvalue.digest}}</p>
                            <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}{{if subvalue.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}}</p>
                        </div>
                    </div>
                    {{else if subvalue.item_show_type == 7}} <!-- 语音分享页 -->
                    <div id="WXVOICE{{value.comm_msg_info.id}}" class="weui_media_box appmsg audio_msg_primary js_appmsg {{if subvalue.malicious_title_reason_id != 1 && subvalue.malicious_title_reason_id}}media_warn{{/if}}" hrefs="{{subvalue.content_url}}" data-t="7">
                            <div class="weui_media_hd js_icon js_media" data-type="AUDIO">
                                {{if !subvalue.malicious_title_reason_id || subvalue.malicious_title_reason_id <= 0}}
                                <audio fileid="{{subvalue.audio_fileid}}" preload data-time=\'{{subvalue.duration}}\' src="{{subvalue.play_url}}">
                                    not support</audio>
                                {{/if}}
                            </div>
                            <div class="weui_media_bd js_media" data-type="AUDIO">
                                <h4 class="weui_media_title">{{handleTitle subvalue.title subvalue.malicious_content_type subvalue.malicious_title_reason_id}}</h4>
                                <p class="weui_media_desc">{{=subvalue.digest}}</p>
                                <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>
                            </div>
                    </div>
                    {{else if subvalue.item_show_type == 8}} <!-- 图片分享页 -->
                    <div id="WXIMG{{value.comm_msg_info.id}}" class="weui_media_box appmsg img js_appmsg" hrefs="{{subvalue.content_url}}" data-t="8">
                        {{if subvalue.cover}}
                        <span class="weui_media_hd js_media" style="background-image:url({{handleCdnImg subvalue.cover subvalue.malicious_content_type subvalue.malicious_title_reason_id}})" data-s="640" data-type="IMG">
                        {{else}}
                        <span class="weui_media_hd js_media" style="background-image:url(https://mp.weixin.qq.com/mp/getmediadata?__biz={{biz}}&type=img&mode=normal&msgid={{value.comm_msg_info.id}}&uin={{uin}}&key={{key}}&openkey={{openkey}}#wechat_redirect)" data-s="640" data-type="IMG">
                        {{/if}}
                        </span>
                        <div class="weui_media_bd js_media" data-type="IMG">
                            <h4 class="weui_media_title" hrefs="{{subvalue.content_url}}">
                              {{handleTitle subvalue.title subvalue.malicious_content_type subvalue.malicious_title_reason_id}}
                            </h4>
                            <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>
                        </div>
                    </div>
                    {{else if subvalue.item_show_type == 10}} <!-- 文字分享页 -->
                    <div id="WXIMG{{value.comm_msg_info.id}}" class="weui_media_box text js_appmsg" hrefs="{{subvalue.content_url}}" data-t="10">
                        <div class="weui_media_bd js_media" data-type="TEXT">
                          <div class="weui_media_text">
                            {{handleTextEmoji subvalue.title subvalue.item_show_type}}
                          </div>
                        </div>
                        <div class="weui_media_ft js_media" data-type="TEXT">
                            <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>
                        </div>
                    </div>
                    {{else}} <!-- 普通图文 -->
                    <div id="WXAPPMSG{{value.comm_msg_info.id}}" class="weui_media_box appmsg js_appmsg" hrefs="{{subvalue.content_url}}" data-t="0">
                        {{if subvalue.cover}}
                        <span class="weui_media_hd js_media" style="background-image:url({{handleCdnImg subvalue.cover subvalue.malicious_content_type subvalue.malicious_title_reason_id}})" data-s="640" hrefs="{{subvalue.content_url}}" data-type="APPMSG">
                        </span>
                        {{/if}}
                        <div class="weui_media_bd js_media" data-type="APPMSG">
                            <h4 class="weui_media_title" hrefs="{{subvalue.content_url}}">
                            {{if subvalue.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}}
                            {{if subvalue.title}}
                                {{handleTitle subvalue.title subvalue.malicious_content_type subvalue.malicious_title_reason_id}}
                            {{else}}
                                {{dateFormat value.comm_msg_info.datetime*1000 \'yyyy/MM/dd\'}}
                            {{/if}}
                            </h4>
                            <p class="weui_media_desc">{{=subvalue.digest}}</p>
                            <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}{{if subvalue.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}}</p> 
                        </div>
                    </div>
                    {{/if}}

                {{/if}}
                {{/each}}
            </div>
        </div>
        {{/if}}
    {{/if}}
{{/each}}
</script>
