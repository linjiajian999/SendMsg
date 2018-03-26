/// <reference types="react" />
import { Component, ReactElement } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { _Props, _NavigationOptions } from '../../types';
export interface HomeDataListItem {
    phone: string | number;
    state: SendState;
}
export declare enum SendState {
    waitting = "\u7B49\u5F85\u53D1\u9001",
    sending = "\u53D1\u9001\u4E2D",
    success = "\u53D1\u9001\u6210\u529F",
    error = "\u53D1\u9001\u9519\u8BEF",
}
export interface HomeState {
    data: Array<HomeDataListItem>;
    isStart: boolean;
}
/**
 * implement
 */
declare class Home extends Component<any, HomeState> {
    static navigationOptions: _NavigationOptions;
    private LINSTENER_KEY;
    private MAX_LIST_COUNT;
    private timer;
    private timerInterval;
    private lastSendMsgIndex;
    constructor(props: _Props);
    /**
     * render function
     */
    keyExtractor: (item: HomeDataListItem, index: number) => string;
    renderItem: ({ item }: ListRenderItemInfo<HomeDataListItem>) => JSX.Element;
    itemSeparator: () => ReactElement<any>;
    switchOnPress: () => void;
    render(): JSX.Element;
    /**
     * methods
     */
    componentWillMount(): void;
    fetchData(startId: number): Promise<number>;
    stopFetchData(): void;
    toFectchDataRecursive(startId: number): Promise<any>;
    toFetchDataCirculating(): void;
    sendMsgRecursive(): void;
    toSendMsg(id: number, phone: string, msg: string): Promise<string>;
}
export default Home;
