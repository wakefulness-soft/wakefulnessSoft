import s from "./HeadlineComponent.module.css";

type HeaderComponentProps = {
  title: string;
};

export const HeadlineComponent = ( { title } : HeaderComponentProps ) => {
  return <h2 className={s.headline}>{ title }</h2>
};
