/* eslint-disable camelcase */

export interface categories {
  id: number,
  name: string,
  description: string,
  // eslint-disable-next-line no-use-before-define
  sub_categories: sub_categories[],
  created_at: Date,
  updated_at: Date
}

export interface sub_categories {
  id: number,
  name: string,
  parent_id: number,
  description: string,
  created_at: Date,
  updated_at: Date,
}
