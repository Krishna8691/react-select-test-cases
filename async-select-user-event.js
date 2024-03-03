test("react select test", async () => {
  const user = userEvent.setup();

  render(
    <AsyncSelect
      defaultOptions
      loadOptions={async () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              { value: "Pear", label: "Pear" },
              { value: "Banana", label: "Banana" },
              { value: "Apple", label: "Apple" },
            ]);
          }, 1000);
        })
      }
      closeMenuOnSelect={false}
      onMenuClose={() => {
        console.log("Menu closed!");
      }}
      isMulti
      blurInputOnSelect={false}
    />
  );

  const inputElem = screen.getByRole("combobox");

  await act(() => user.click(inputElem));

  const options = await screen.findAllByRole("option");
  expect(options.length).toEqual(3);

  user.keyboard("[Enter]");
  user.keyboard("[Enter]");
  user.keyboard("[Enter]");

  const pear = await screen.findByLabelText("Remove Pear");
  expect(pear).toBeInTheDocument();

  const banana = await screen.findByLabelText("Remove Banana");
  expect(banana).toBeInTheDocument();

  const apple = await screen.findByLabelText("Remove Apple");
  expect(apple).toBeInTheDocument();
});
