/// <reference types="react" />
import { Component } from 'react';
import { _Props, _NavigationOptions } from '../../types';
export interface TestState {
    phone: string;
    content: string;
    msgId: number;
    isSending: boolean;
    modalVisible: boolean;
    sendState: string;
}
declare class Test extends Component<any, TestState> {
    static navigationOptions: _NavigationOptions;
    private LINSTENER_KEY;
    constructor(props: _Props);
    _onPhoneChange: (phone: string) => void;
    _onContentChange: (content: string) => void;
    _press: () => void;
    _modalOnClose: () => void;
    componentWillMount(): void;
    render(): JSX.Element;
}
export default Test;
