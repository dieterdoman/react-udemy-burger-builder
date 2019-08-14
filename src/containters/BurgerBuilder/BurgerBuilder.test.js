import {BurgerBuilder} from "./BurgerBuilder";
import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({adapter: new Adapter()});

describe('Burger builder', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} totalPrice={0}/>)
    });

    it('should render Build controls when receiving ingredients', () => {
       wrapper.setProps({ingredients: {salad: 0}});
       expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});
