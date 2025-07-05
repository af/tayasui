const expectedUsage = <div>
  <hstack-i>
    hi
  </hstack-i>

  <vstack-i>
    hello
  </vstack-i>

  <card-i padding="s">
    <h1>Hello</h1>
    <switch-i>
      <label><input type="checkbox" /> Checkbox</label>
    </switch-i>
  </card-i>
</div>

// @ts-expect-error This is not a real element
const invalid1 = <jstack-i>nonsense</jstack-i>

// @ts-expect-error This is not a supported property
const invalidProperty = <hstack-i asdf>nonsense</hstack-i>

console.log(expectedUsage)
