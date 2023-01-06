let instance: AssetManager = null;

class AssetManager {
    static getInstance() {
        if (instance === null) {
            instance = new AssetManager();
        }

        return instance;
    }

    getUrl(resourceUri: String) {
        return `${process.env.RESOURCES_URL}/${resourceUri}`;
    }

    static getUrl(resourceUri: String) {
        return AssetManager.getInstance().getUrl(resourceUri);
    }
}

export default AssetManager;