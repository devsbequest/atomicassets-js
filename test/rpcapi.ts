import { expect } from 'chai';

import RpcApi from '../src/API/Rpc';

// tslint:disable-next-line:no-var-requires
const fetch = require('node-fetch');

describe('RPC API', () => {
  const api = new RpcApi(
    'https://test.wax.api.atomicassets.io',
    'atomicassets',
    {
      fetch,
      rateLimit: 4,
    },
  );

  const exampleAsset = {
    owner: 'testuser2222',
    id: '1099511627784',
  };

  it('fetch asset ' + exampleAsset.id, async (done) => {
    const asset = await api.getAsset(exampleAsset.owner, exampleAsset.id);
    console.log(asset);
    const result = await asset.toObject();
    expect(result).to.deep.equal(result);
    done();
  }).timeout(10000);

  it('test caching ' + exampleAsset.id, async (done) => {
    const asset = await api.getAsset(exampleAsset.owner, exampleAsset.id);
    console.log(asset);
    const result = await asset.toObject();
    expect(result).to.deep.equal(result);
    done();
  }).timeout(10000);

  it('fetch offers ' + exampleAsset.id, async (done) => {
    const offers = await api.getAccountOffers(exampleAsset.owner);

    const result = await Promise.all(
      offers.map(async (offer) => await offer.toObject()),
    );

    expect(result).to.deep.equal(result);
    done();
  }).timeout(20000);

  it('fetch assets ', async (done) => {
    const assets = await api.getAccountAssets(exampleAsset.owner);

    const result = await Promise.all(
      assets.map(async (asset) => await asset.toObject()),
    );

    expect(result).to.deep.equal(result);
    done();
  }).timeout(120000);

  it('fetch collection inventory ', async () => {
    const assets = await api.getCollectionInventory('gpk.topps', 'lc4l.wam');

    const result = await Promise.all(assets.map((asset) => asset.toObject()));
    expect(result).to.deep.equal([]);
  }).timeout(120000);
});
