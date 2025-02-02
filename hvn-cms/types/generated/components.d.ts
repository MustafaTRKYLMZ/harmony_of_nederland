import type { Schema, Struct } from '@strapi/strapi';

export interface SharedEmergencyContact extends Struct.ComponentSchema {
  collectionName: 'components_shared_emergency_contacts';
  info: {
    description: 'Emergency contact information';
    displayName: 'Emergency Contact';
  };
  attributes: {
    address: Schema.Attribute.Text;
    email: Schema.Attribute.Email;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
    relationship: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.emergency-contact': SharedEmergencyContact;
    }
  }
}
