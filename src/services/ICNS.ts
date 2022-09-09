import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { fetch } from 'react-native-fetch-api';

import { IC_URL_HOST } from '@/constants/general';
import registryIDL from '@/utils/ic/ICNS/registry.did';
import resolverIDL from '@/utils/ic/ICNS/resolver.did';
import ReverseRegistrarIDL from '@/utils/ic/ICNS/reverse_registrar.did';
import shortAddress from '@/utils/shortAddress';

const ICNS_REGISTRY_ID = 'e5kvl-zyaaa-aaaan-qabaq-cai';
const ICNS_RESOLVER_ID = 'euj6x-pqaaa-aaaan-qabba-cai';
const ICNS_REVERSE_REGISTRAR_ID = 'etiyd-ciaaa-aaaan-qabbq-cai';

const DEFAULT_AGENT = new HttpAgent({
  fetch: fetch,
  host: IC_URL_HOST,
});

export const shortICNSName = (name: string) => shortAddress(name);

export const ICNS_LOGO = 'https://icns.id/ICNS-logo.png';

const Resolver = Actor.createActor(resolverIDL, {
  canisterId: ICNS_RESOLVER_ID,
  agent: DEFAULT_AGENT,
});

const Registry = Actor.createActor(registryIDL, {
  canisterId: ICNS_REGISTRY_ID,
  agent: DEFAULT_AGENT,
});

const ReverseRegistrar = Actor.createActor(ReverseRegistrarIDL, {
  canisterId: ICNS_REVERSE_REGISTRAR_ID,
  agent: DEFAULT_AGENT,
});

/** Resolution rules:
 * 1. If it's ICP
 *    - If the returned Record has an account, return the account
 *    - If not, if the returned Record has a pid, return the pid
 *    - If not, fetch the record from the Registry and return the owner's pid.
 *
 * 2. If it's not ICP:
 *    - If the returned Record has a pid, return the pid
 *    - If not, fetch the record from the Registry and return the owner's pid.
 */
export const resolveName = async (name: string, isICP: boolean) => {
  let record = (await Resolver.getUserDefaultInfo(name)) as any;
  const { icp, pid: principal } = record?.[0] || {};
  const accountId = icp?.[0];
  if (isICP && accountId) {
    return accountId;
  }
  if (!principal || !principal.length) {
    record = await Registry.getRecord(name);
    const { owner } = record?.[0] || {};
    return owner?.toString?.();
  }
  return Array.isArray(principal)
    ? principal?.[0]?.toString()
    : principal?.toString?.();
};

export const getReverseResolvedName = async (principal: string) => {
  try {
    const name = (await ReverseRegistrar.getName(
      Principal.fromText(principal)
    )) as any;
    return name?.toString?.();
  } catch (e) {
    console.warn('Failed to get reverse resolved name', e);
    return null;
  }
};

export const getMultipleReverseResolvedNames = async (principals: string[]) => {
  const names: { [key: string]: string } = {};

  await Promise.all(
    principals.map(async (pid: string) => {
      const name = await getReverseResolvedName(pid);
      names[pid] = name;
    })
  );
  return names;
};
