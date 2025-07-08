// Simple script intended only to verify the jsx typings work as expected
// This is just meant to be used for tsc, not to be run

const expectedUsage = <div>
  <hstack-i>
    hi
  </hstack-i>

  <vstack-i>
    hello
    <skeleton-i radius="full" />
  </vstack-i>

  <card-i padding="s">
    <h1>Hello</h1>
    <switch-i>
      <label><input type="checkbox" /> Checkbox</label>
    </switch-i>
  </card-i>
</div>

// @ts-expect-error This is not a real element
const _invalid1 = <jstack-i>nonsense</jstack-i>

// @ts-expect-error This is not a supported property
const _invalidProperty = <hstack-i asdf>nonsense</hstack-i>

console.log(expectedUsage)
