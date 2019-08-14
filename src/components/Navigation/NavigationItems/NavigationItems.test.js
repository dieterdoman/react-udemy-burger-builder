import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({adapter: new Adapter()});

describe('Navigation Items', () => {
    it('should render 2 navigation item elements if not authenticated', () => {
        const wrapper = shallow(<NavigationItems isAuthenticated={false}/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
});
