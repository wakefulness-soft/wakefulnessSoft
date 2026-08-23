import s from './EyebrowComponent.module.css';

type EyebrowComponentProps = {
    text: string;
};

export const EyebrowComponent = ( { text } : EyebrowComponentProps ) => {
  return (
    <span className={s.eyebrow}>{text}</span>
  )
}
