import * as migration_20240716_023449_init from './20240716_023449_init';
import * as migration_20240716_200448_add_posts from './20240716_200448_add_posts';
import * as migration_20240816_002910 from './20240816_002910';
import * as migration_20240904_002641 from './20240904_002641';
import * as migration_20240904_004606 from './20240904_004606';
import * as migration_20240904_034039 from './20240904_034039';

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
    name: '20240904_034039'
  },
];
