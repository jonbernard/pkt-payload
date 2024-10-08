import * as migration_20240716_023449_init from './20240716_023449_init';
import * as migration_20240716_200448_add_posts from './20240716_200448_add_posts';
import * as migration_20240816_002910 from './20240816_002910';
import * as migration_20240904_002641 from './20240904_002641';
import * as migration_20240904_004606 from './20240904_004606';
import * as migration_20240904_034039 from './20240904_034039';
import * as migration_20240904_142602 from './20240904_142602';
import * as migration_20240905_193914 from './20240905_193914';
import * as migration_20240908_203146 from './20240908_203146';
import * as migration_20240909_001404 from './20240909_001404';
import * as migration_20240909_025019 from './20240909_025019';
import * as migration_20240909_025330 from './20240909_025330';
import * as migration_20240918_193400 from './20240918_193400';
import * as migration_20241008_214238_use_link_payments from './20241008_214238_use_link_payments';

export const migrations = [
  {
    up: migration_20240716_023449_init.up,
    down: migration_20240716_023449_init.down,
    name: '20240716_023449_init',
  },
  {
    up: migration_20240716_200448_add_posts.up,
    down: migration_20240716_200448_add_posts.down,
    name: '20240716_200448_add_posts',
  },
  {
    up: migration_20240816_002910.up,
    down: migration_20240816_002910.down,
    name: '20240816_002910',
  },
  {
    up: migration_20240904_002641.up,
    down: migration_20240904_002641.down,
    name: '20240904_002641',
  },
  {
    up: migration_20240904_004606.up,
    down: migration_20240904_004606.down,
    name: '20240904_004606',
  },
  {
    up: migration_20240904_034039.up,
    down: migration_20240904_034039.down,
    name: '20240904_034039',
  },
  {
    up: migration_20240904_142602.up,
    down: migration_20240904_142602.down,
    name: '20240904_142602',
  },
  {
    up: migration_20240905_193914.up,
    down: migration_20240905_193914.down,
    name: '20240905_193914',
  },
  {
    up: migration_20240908_203146.up,
    down: migration_20240908_203146.down,
    name: '20240908_203146',
  },
  {
    up: migration_20240909_001404.up,
    down: migration_20240909_001404.down,
    name: '20240909_001404',
  },
  {
    up: migration_20240909_025019.up,
    down: migration_20240909_025019.down,
    name: '20240909_025019',
  },
  {
    up: migration_20240909_025330.up,
    down: migration_20240909_025330.down,
    name: '20240909_025330',
  },
  {
    up: migration_20240918_193400.up,
    down: migration_20240918_193400.down,
    name: '20240918_193400',
  },
  {
    up: migration_20241008_214238_use_link_payments.up,
    down: migration_20241008_214238_use_link_payments.down,
    name: '20241008_214238_use_link_payments'
  },
];
