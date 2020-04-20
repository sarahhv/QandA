import React from "react";
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Question from "./Question";

// Some test data for the tests.
const question = {
    _id: 23,
    title: "What is pizza?",
    answers: []
};

it('Renders the title of the question', () => {
    const comp = <Question getQuestion={_ => question}/>;
    const {getByText} = render(comp);
    expect(getByText(question.title)).toBeInTheDocument();
});