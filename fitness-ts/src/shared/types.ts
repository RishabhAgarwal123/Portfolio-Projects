export enum SelectedPage {
  Home = 'home',
  Benefits = 'benefits',
  OurClasses = 'outclasses',
  ContactUs = 'contactus'
}

export interface BenefitType {
  icon: JSX.Element;
  title: String;
  description: String;
}