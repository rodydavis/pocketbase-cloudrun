// Sample run-helloworld is a minimal Cloud Run service.
package main

import (
	"log"
	"os"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	storage := getStoragePath()
	app := pocketbase.NewWithConfig(pocketbase.Config{
		DefaultDev:     isProd(),
		DefaultDataDir: storage + "/pb_data",
	})

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.GET("/*", apis.StaticDirectoryHandler(os.DirFS(storage+"/pb_public"), false))
		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

func isProd() bool {
	return os.Getenv("ENV") == "prod"
}

func getStoragePath() string {
	storage := "."
	if isProd() {
		storage = "/cloud/storage"
	}
	return storage
}
