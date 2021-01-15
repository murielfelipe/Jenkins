import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import React from "react";
import userEvent from "@testing-library/user-event";

async function fetchPost() {
  const result = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    body: JSON.stringify({
      userId: 3,
      id: Math.floor(Math.random() * 100) + 1,
      title: "Do math homework",
      completed: false
    }, 
    {
      userId: 4,
      id: Math.floor(Math.random() * 100) + 1,
      title: "Do bio homework",
      completed: false
    })
  })
    .then(res => res.json())
    .then(data => {
    });
}

describe("<App /> tests", () => {

  it("add new todo ", async () => {
    fetchPost();
    // fetchMock.once(mockToDos);

    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    userEvent.type(screen.getByRole("textbox"), "Do math homework");
    userEvent.click(screen.getByText(/add new todo/i));
    await waitForElementToBeRemoved(() => screen.getByText(/saving/i));
    expect(screen.getByText(/do math homework/i)).toBeInTheDocument();
  });

  it("remove todo from list", async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    userEvent.click(screen.getByTestId("close-btn-3"));
    expect(screen.queryByText(/fugiat veniam minus/i)).not.toBeInTheDocument();
  });

  it("should cross out after completing", async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    userEvent.click(screen.getByTestId("checkbox-1"));
    expect(screen.getByText(/delectus aut autem/i)).toHaveClass("completed");
  });

  it("click Remove All button, should remove all todos", async () => {
    fetchPost();
    // fetchMock.once(mockToDos);
    
    const { container } = render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    userEvent.click(screen.getByText(/Remove All/i));
    const foo = container.querySelectorAll('[class*="todoList"]');
    expect(foo.length).toEqual(0);
  });

  it("should select all items", async () => {
    const { container } = render(<App />)
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    await screen.findByText('delectus aut autem')
    userEvent.click(screen.getByTestId("btn-select-all"));
    const foo = container.querySelectorAll('[class*="completed"]')
    expect(foo.length).toEqual(5);
  });

});
