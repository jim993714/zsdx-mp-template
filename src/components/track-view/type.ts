export interface ITrackOptions {
    type: string /** 埋点方式 曝光：exposure  点击：click */;
    observerName?: string /** 曝光监听的节点 */;
    clientTop?: number /** 曝光监听触发的位置 */;
    eventData: IEventData /** 提交的数据 */;
    clickData?: ITrackOptions;
    exposureData?: ITrackOptions;
}
export interface IEventData {
    uid?: string /** 用户id */;
    uuid?: string /** 设备id */;
    user_type?: number /** 用户当前身份 */;
    myClient?: string /** 应用信息 */;
    client_ver?: string /** 应用版本 */;
    platform_ver?: string /** 客户端系统版本 */;
    phone_model?: string /** 手机型号 */;
    apn?: number /** 网络 */;
    session_id?: string /** 会话id */;
    ua?: string /** 用户代理标志 */;
    history?: string /** 历史路径 */;
    from_channel?: number /** 启动来源 */;
    path?: string /** 启动：bi_active ; 页面浏览：bi_page ; 信息流曝光点击：bi_feeds ;搜索行为：bi_search; 元素打点：bi_event; */;
    action?: number /** 用户启动方式 2热启动 1冷启动 */;
    student_shop_id: string /** 校园店id */;
    from_type?: number /** 启动来源 1正常 2消息推送 */;
    body_ext?: any /** 补充信息 json */;
    page_time?: number /** 用户启动时间 */;
    event_time?: number /** 用户上报时间 */;
    page_data_type?: string /** 详情页对应的内容类型 */;
    page_data_id?: string /** 详情页对应的内容id */;
    page_data_info?: any /** 详细信息 */;
    nv_name?: string /** 导航栏信息 */;
    model_name?: string /** 模块的名称 */;
    data_type?: string /** 内容类型 */;
    data_id?: string /** 内容的id */;
    data_info?: any /** 内容详细信息 */;
    index?: number /** 信息流中的排序 */;
    rank_type?: string /** 信息流的排序方式 */;
    edit_word?: string /** 用户编辑词 */;
    search_word?: string /** 用户搜索词 */;
    search_session?: string /** 从进入搜索页面开始保持同一个search_session,格式为时间戳+用户 id */;
    search_key?: string /** 每请求一次搜索结果，保持同一个 search_key,修改排序方式等保持不变 */;
}
