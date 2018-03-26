/// <reference types="react" />
import { Component } from 'react';
import { _Props } from '../../types';
import { SendState } from './home';
export interface HomeItemProps extends _Props {
    phone: string | number;
    state: SendState;
}
declare class HomeItem extends Component<HomeItemProps, any> {
    constructor(props: HomeItemProps);
    render(): JSX.Element;
}
export default HomeItem;
