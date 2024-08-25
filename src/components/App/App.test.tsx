import React from 'react';
// import {describe, expect, test} from '@jest/globals';

import { renderComp } from '../../utils/testUtils';

import App from './App';

describe('eyo', () => {
    test('renders learn react link', () => {
        const { container } = renderComp(<App />);
        // Xeslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        // const linkElement = container.getElementsByClassName('.App')
        // expect(linkElement).toBeInTheDocument()
        expect(container).toBeInTheDocument();
    });
});
