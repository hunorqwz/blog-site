import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const createIndexedDBStorage = () => {
  return {
    getItem: async (name: string): Promise<string | null> => {
      return new Promise((resolve) => {
        const request = indexedDB.open("blog-author-db", 1);

        request.onupgradeneeded = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains("author-store")) {
            db.createObjectStore("author-store");
          }
        };

        request.onsuccess = () => {
          const db = request.result;
          const transaction = db.transaction(["author-store"], "readonly");
          const store = transaction.objectStore("author-store");
          const getRequest = store.get(name);

          getRequest.onsuccess = () => {
            resolve(getRequest.result || null);
          };

          getRequest.onerror = () => {
            resolve(null);
          };
        };

        request.onerror = () => {
          resolve(null);
        };
      });
    },

    setItem: async (name: string, value: string): Promise<void> => {
      return new Promise((resolve) => {
        const request = indexedDB.open("blog-author-db", 1);

        request.onupgradeneeded = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains("author-store")) {
            db.createObjectStore("author-store");
          }
        };

        request.onsuccess = () => {
          const db = request.result;
          const transaction = db.transaction(["author-store"], "readwrite");
          const store = transaction.objectStore("author-store");
          const putRequest = store.put(value, name);

          putRequest.onsuccess = () => {
            resolve();
          };

          putRequest.onerror = () => {
            resolve();
          };
        };

        request.onerror = () => {
          resolve();
        };
      });
    },

    removeItem: async (name: string): Promise<void> => {
      return new Promise((resolve) => {
        const request = indexedDB.open("blog-author-db", 1);

        request.onsuccess = () => {
          const db = request.result;
          const transaction = db.transaction(["author-store"], "readwrite");
          const store = transaction.objectStore("author-store");
          const deleteRequest = store.delete(name);

          deleteRequest.onsuccess = () => {
            resolve();
          };

          deleteRequest.onerror = () => {
            resolve();
          };
        };

        request.onerror = () => {
          resolve();
        };
      });
    },
  };
};

interface AuthorState {
  authorName: string;
  isInitialized: boolean;
  hideWelcomeDialog: boolean;
  setAuthorName: (name: string) => void;
  setHideWelcomeDialog: (hide: boolean) => void;
  resetWelcomeDialog: () => void;
  initializeAuthor: () => void;
  updatePostsAuthor: (newName: string) => Promise<void>;
}

export const useAuthorStore = create<AuthorState>()(
  persist(
    (set, get) => ({
      authorName: "",
      isInitialized: false,
      hideWelcomeDialog: false,

      setAuthorName: (name: string) => {
        set({ authorName: name, isInitialized: true });
      },

      setHideWelcomeDialog: (hide: boolean) => {
        set({ hideWelcomeDialog: hide });
      },

      resetWelcomeDialog: () => {
        set({ hideWelcomeDialog: false });
      },

      initializeAuthor: () => {
        if (!get().isInitialized && !get().authorName) {
          set({ isInitialized: true });
        }
      },

      updatePostsAuthor: async (newName: string) => {
        try {
          const oldName = get().authorName;

          const response = await fetch("/api/posts/update-author", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              oldAuthor: oldName,
              newAuthor: newName,
            }),
          });

          if (response.ok) {
            set({ authorName: newName });
          } else {
            throw new Error("Failed to update posts");
          }
        } catch (error) {
          console.error("Error updating posts author:", error);
          throw error;
        }
      },
    }),
    {
      name: "author-storage",
      storage: createJSONStorage(() => createIndexedDBStorage()),
      skipHydration: true,
    }
  )
);

export const useAuthorName = () => {
  const { authorName, isInitialized, hideWelcomeDialog } = useAuthorStore();

  return {
    authorName: authorName || "Anonymous",
    hasAuthorName: Boolean(authorName),
    hideWelcomeDialog,
    isInitialized,
  };
};
