import { allValid } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { defaultParserOptions } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./no-complicated-conditional-rendering";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    dedent`
      function Component({ hideShapes, debugSvg }) {
        // Early return if nothing to render
        if (hideShapes) {
          return null;
        }

        return debugSvg ? <ShapesWithSVGs /> : <ShapesToDisplay />;
      }
    `,
    dedent`
        const foo = Math.random() > 0.5;
        const bar = "bar";

        const App = () => {
          return <div>{foo || bar}</div>
      }
    `,
    dedent`
        type AppProps = {
          foo: string;
        }

        const App = ({ foo }: AppProps) => {
          return <div>{foo}</div>
      }
    `,
    dedent`
        type AppProps = {
          items: string[];
        }

        const App = ({ items }: AppProps) => {
          return <div>There are {items.length} elements</div>
      }
    `,
    dedent`
        type AppProps = {
          items: string[];
          count: number;
        }

        const App = ({ items, count }: AppProps) => {
          return <div>{!count && 'No results found'}</div>
      }
    `,
    dedent`
        type ListProps = {
          items: string[];
        }

        const List = ({ items }: ListProps) => {
          return <div>{items.map(item => <div key={item}>{item}</div>)}</div>
        }

        type AppProps = {
          items: string[];
        }

        const App = ({ items }: AppProps) => {
          return <div>{!!itesm.length && <List items={items}/>}</div>
      }
    `,
    dedent`
        type ListProps = {
          items: string[];
        }

        const List = ({ items }: ListProps) => {
          return <div>{items.map(item => <div key={item}>{item}</div>)}</div>
        }

        type AppProps = {
          items: string[];
        }

        const App = ({ items }: AppProps) => {
          return <div>{Boolean(items.length) && <List items={items}/>}</div>
      }
    `,
    dedent`
        type ListProps = {
          items: string[];
        }

        const List = ({ items }: ListProps) => {
          return <div>{items.map(item => <div key={item}>{item}</div>)}</div>
        }

        type AppProps = {
          items: string[];
        }

        const App = ({ items }: AppProps) => {
          return <div>{items.length > 0 && <List items={items}/>}</div>
      }
    `,
    dedent`
        type ListProps = {
          items: string[];
        }

        const List = ({ items }: ListProps) => {
          return <div>{items.map(item => <div key={item}>{item}</div>)}</div>
        }

        type AppProps = {
          items: string[];
        }

        const App = ({ items }: AppProps) => {
          return <div>{items.length ? <List items={items}/> : null}</div>
      }
    `,
    dedent`
        type ListProps = {
          items: string[];
        }

        const List = ({ items }: ListProps) => {
          return <div>{items.map(item => <div key={item}>{item}</div>)}</div>
        }

        type AppProps = {
          items: string[];
          count: number;
        }

        const App = ({ items, count }: AppProps) => {
          return <div>{count ? <List items={items}/> : null}</div>
      }
    `,
    dedent`
        type ListProps = {
          items: string[];
        }

        const List = ({ items }: ListProps) => {
          return <div>{items.map(item => <div key={item}>{item}</div>)}</div>
        }

        type AppProps = {
          items: string[];
          count: number;
        }

        const App = ({ items, count }: AppProps) => {
          return <div>{!!count && <List items={items}/>}</div>
      }
    `,
    dedent`
      const App = () => {
        return (
            <>
            {0 ? <Foo /> : null}
            {'' && <Foo />}
            {NaN ? <Foo /> : null}
            </>
            )
        }
    `,
    dedent`
      const foo = Math.random() > 0.5;
      const bar = 0;
      function App() {
        return (
          <button
            type="button"
            disabled={foo && bar === 0}
            onClick={() => {}}
          />
        );
      }
    `,
    `
      const someCondition = JSON.parse("true") as boolean;
      const SomeComponent = () => <div />;

      const App = () => {
        return (
          <>
            {!!someCondition && (
              <SomeComponent
                prop1={val1}
                prop2={val2}
              />
            )}
          </>
        )
      }
      `,
    dedent`
      const someCondition = JSON.parse("") as any;
      const SomeComponent = () => <div />;

      const App = () => {
        return (
          <>
            {!!someCondition && (
              <SomeComponent
                prop1={val1}
                prop2={val2}
              />
            )}
          </>
        )
      }
    `,
    dedent`
      const someCondition = JSON.parse("") as unknown;
      const SomeComponent = () => <div />;

      const App = () => {
        return (
          <>
            {!!someCondition && (
              <SomeComponent
                prop1={val1}
                prop2={val2}
              />
            )}
          </>
        )
      }
    `,
    dedent`
      const someCondition = 0
      const SomeComponent = () => <div />;

      const App = () => {
        return (
          <>
            {!!someCondition && (
              <SomeComponent
                prop1={val1}
                prop2={val2}
              />
            )}
          </>
        )
      }
    `,
    dedent`
      const someCondition = 1
      const SomeComponent = () => <div />;

      const App = () => {
        return (
          <>
            {!!someCondition && (
              <SomeComponent
                prop1={val1}
                prop2={val2}
              />
            )}
          </>
        )
      }
    `,
    dedent`
      const SomeComponent = () => <div />;
      const App = ({
        someCondition,
      }: {
        someCondition?: number | undefined;
      }) => {
        return (
          <>
            {someCondition
              ? someCondition
              : <SomeComponent />
            }
          </>
        )
      }
    `,
    dedent`
      const someCondition = true
      const SomeComponent = () => <div />;

      const App = () => {
        return (
          <>
            {someCondition
              ? (
              <SomeComponent
                prop1={val1}
                prop2={val2}
              />)
              : "else"
            }
          </>
        )
      }
    `,
    dedent`
      const SomeComponent = () => <div />;
      const someFunction = (input: unknown): 10 => 10

      const App = ({ someCondition }: { someCondition?: number | undefined }) => {
        return <>{someCondition ? someFunction(someCondition) : <SomeComponent />}</>;
      };
    `,
    dedent`
      const SomeComponent = () => <div />;

      const App = ({
        someCondition,
      }:{
        someCondition?: boolean | undefined;
      }) => {
        return (
          <>
            {someCondition && <SomeComponent />}
          </>
        )
      }
    `,
    dedent`
      type AppProps<T> = {
        someFunction: (data: T) => React.ReactNode;
      };

      function App<T>({ someFunction }: AppProps<T>) {
        return <>{!!someFunction && someFunction<number>(1)}</>;
      }
    `,
    dedent`
      const App = () => {
        return (
            <>
            {0 && <Foo />}
            {NaN && <Foo />}
            </>
            )
        }
    `,
  ],
  invalid: [
    {
      code: dedent`
        function Component({ hideShapes, debugSvg }) {
          return <div>{hideShapes ? null : debugSvg ? <ShapesWithSVGs /> : <ShapesToDisplay />}</div>;
        }
      `,
      errors: [
        {
          messageId: "NO_COMPLICATED_CONDITIONAL_RENDERING",
        },
      ],
    },
    {
      code: dedent`
        type AppProps = {
          items: string[];
          count: number;
        }

        const App = ({ items, count }: AppProps) => {
            return <div>{direction ? (direction === "down" ? "▼" : "▲") : ""}</div>
        }
      `,
      errors: [
        {
          messageId: "NO_COMPLICATED_CONDITIONAL_RENDERING",
        },
      ],
    },
    {
      code: dedent`
        const someCondition = 0;
        const SomeComponent = () => <div />;

        const App = () => {
          return (
            <>
              {!!someCondition
                ? (
                <SomeComponent
                  prop1={val1}
                  prop2={val2}
                />)
                : someCondition ? null : <div />
              }
            </>
          )
        }
      `,
      errors: [
        {
          messageId: "NO_COMPLICATED_CONDITIONAL_RENDERING",
        },
      ],
    },
    {
      code: dedent`
        const someCondition = 0;
        const SomeComponent = () => <div />;

        const App = () => {
          return (
            <>
              {!!someCondition
                ? (
                <SomeComponent
                  prop1={val1}
                  prop2={val2}
                />)
                : someCondition && <div />
              }
            </>
          )
        }
      `,
      errors: [
        {
          messageId: "NO_COMPLICATED_CONDITIONAL_RENDERING",
        },
      ],
    },
    {
      code: dedent`
        const someCondition = 0;
        const SomeComponent = () => <div />;

        const App = () => {
          return (
            <>
              {!!someCondition
                ? (
                <SomeComponent
                  prop1={val1}
                  prop2={val2}
                />)
                : someCondition ? someCondition : <div />
              }
            </>
          )
        }
      `,
      errors: [
        {
          messageId: "NO_COMPLICATED_CONDITIONAL_RENDERING",
        },
      ],
    },
    {
      code: dedent`
        const someCondition = 0;
        const SomeComponent = () => <div />;

        const App = () => {
          return (
            <>
              {!!someCondition
                ? (
                <SomeComponent
                  prop1={val1}
                  prop2={val2}
                />)
                : someCondition ? "aaa"
                : someCondition && someCondition
                ? <div />
                : null
              }
            </>
          )
        }
      `,
      errors: [
        {
          messageId: "NO_COMPLICATED_CONDITIONAL_RENDERING",
        },
      ],
    },
  ],
});
