export enum WeekDay {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export interface OpeningDay {
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
}

export interface RestaurantInfo {
  name: string;
  phone: string;
  address: string;
}

export interface SettingsEntity {
  deliveryCharge: number;
  restaurant: RestaurantInfo;
  openingHours: Record<WeekDay, OpeningDay>;
  createdAt: Date;
  updatedAt: Date;
}