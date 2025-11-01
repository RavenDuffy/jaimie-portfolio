import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksImageAndText extends Struct.ComponentSchema {
  collectionName: 'components_blocks_image_and_texts';
  info: {
    displayName: 'Image and Text';
  };
  attributes: {
    direction: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'left'>;
    height: Schema.Attribute.Integer;
    image: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.Text;
    width: Schema.Attribute.Integer;
  };
}

export interface BlocksLanding extends Struct.ComponentSchema {
  collectionName: 'components_blocks_landings';
  info: {
    displayName: 'Landing';
  };
  attributes: {
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    splash: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    external: Schema.Attribute.String;
    internal: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    relative: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavigationFooter extends Struct.ComponentSchema {
  collectionName: 'components_navigation_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    links: Schema.Attribute.Component<'elements.link', true>;
  };
}

export interface NavigationHeader extends Struct.ComponentSchema {
  collectionName: 'components_navigation_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    links: Schema.Attribute.Component<'elements.link', true>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.image-and-text': BlocksImageAndText;
      'blocks.landing': BlocksLanding;
      'elements.link': ElementsLink;
      'navigation.footer': NavigationFooter;
      'navigation.header': NavigationHeader;
    }
  }
}
