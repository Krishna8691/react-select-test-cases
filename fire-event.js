// "@testing-library/jest-dom": "^5.17.0",
// "@testing-library/react": "^13.4.0",
// "@testing-library/user-event": "^13.5.0",
// "jest": "^29.5.1",

test("React select ------ ", async () => {
  render(
    <Select
      options={[
        { value: "Pear", label: "Pear" },
        { value: "Banana", label: "Banana" },
        { value: "Apple", label: "Apple" },
        { value: "Orange", label: "Orange" },
      ]}
      isMulti
      closeMenuOnSelect={false}
      onMenuClose={() => console.log("CLosed!!")}
      blurInputOnSelect={false}
    />
  );

  const inputElement = screen.getByRole("combobox");
  act(() => userEvent.click(inputElement));
  const options = await screen.findAllByRole("option");
  expect(options.length).toEqual(4);

  const pear = await screen.findByText("Pear");
  const banana = await screen.findByText("Banana");
  const orange = await screen.findByText("Orange");

  act(() => {
    fireEvent.keyDown(pear, { key: "Enter", code: "Enter", charCode: 13 });
  });

  const pearOpt = await screen.findByLabelText("Remove Pear");
  expect(pearOpt).toBeDefined();

  act(() => {
    fireEvent.keyDown(banana, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });
  });

  const banOpt = await screen.findByLabelText("Remove Banana");
  expect(banOpt).toBeDefined();

  act(() => {
    fireEvent.keyDown(inputElement, {
      key: "ArrowDown",
      code: "Arrow Down",
      charCode: 40,
    });
  });

  act(() => {
    fireEvent.keyDown(orange, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });
  });

  const orangeOpt = await screen.findByLabelText("Remove Orange");
  expect(orangeOpt).toBeDefined();
});
