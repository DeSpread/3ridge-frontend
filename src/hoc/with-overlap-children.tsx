import React, { PropsWithChildren } from "react";

export default function WithOverlapChildren<
  T extends PropsWithChildren = PropsWithChildren
>(WrappedComponent: React.ComponentType<T>) {
  const ComponentWith = (props: T) => {
    return (
      <>
        <WrappedComponent {...(props as T)} />
        <div
          style={{
            position: "absolute",
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {props.children}
        </div>
      </>
    );
  };
  return ComponentWith;
}
