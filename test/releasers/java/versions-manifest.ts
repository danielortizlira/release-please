// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {describe, it} from 'mocha';

import {expect} from 'chai';
import {VersionsManifest} from '../../../src/updaters/java/versions-manifest';

describe('VersionsManifest', () => {
  describe('parseVersions', () => {
    // See: https://github.com/googleapis/release-please/issues/506
    it('handles malformed data on end of line', async () => {
      const input = `# Format:
# module:released-version:current-version

proto-google-cloud-redis-v1:1.0.0:1.0.1-SNAPSHOT:q
proto-google-cloud-redis-v1beta1:0.85.0:0.85.1-SNAPSHOT
grpc-google-cloud-redis-v1beta1:0.85.0:0.85.1-SNAPSHOT
grpc-google-cloud-redis-v1:1.0.0:1.0.1-SNAPSHOT
google-cloud-redis:1.0.0:1.0.1-SNAPSHOT`;
      const versions = VersionsManifest.parseVersions(input);
      expect(versions.get('proto-google-cloud-redis-v1')).to.equal('1.0.0');
    });
  });

  describe('needsSnapshot', () => {
    const input = `# Format:
# module:released-version:current-version

google-cloud-bom:0.132.0:0.132.0`;
    console.log(VersionsManifest.needsSnapshot(input));
    expect(VersionsManifest.needsSnapshot(input)).to.be.true;
  });
});
